import numpy as np
import onnxruntime as ort
from PIL import Image
from config import *

TILE_SIZE = 128
SCALE = 4

print("Loading upscaler model...")

session = ort.InferenceSession(
    UPSCALE_MODEL,
    providers=["CUDAExecutionProvider", "CPUExecutionProvider"]
)

input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name


def preprocess(img):
    img = np.array(img).astype(np.float32) / 255.0
    img = np.transpose(img, (2, 0, 1))
    img = np.expand_dims(img, axis=0)
    return img


def postprocess(tensor):

    if tensor.ndim == 4:
        tensor = tensor[0]

    tensor = np.transpose(tensor, (1, 2, 0))
    tensor = np.clip(tensor * 255.0, 0, 255).astype(np.uint8)

    return Image.fromarray(tensor)


def upscale_image(input_path, output_path):

    img = Image.open(input_path).convert("RGB")

    w, h = img.size
    out = Image.new("RGB", (w * SCALE, h * SCALE))

    for y in range(0, h, TILE_SIZE):
        for x in range(0, w, TILE_SIZE):

            tile = img.crop((x, y, x + TILE_SIZE, y + TILE_SIZE))
            tile = tile.resize((TILE_SIZE, TILE_SIZE))

            inp = preprocess(tile)
            sr = session.run([output_name], {input_name: inp})[0]

            sr_img = postprocess(sr)

            out.paste(sr_img, (x * SCALE, y * SCALE))

    out.save(output_path)

    return output_path