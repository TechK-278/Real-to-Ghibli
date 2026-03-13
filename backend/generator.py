import torch
import contextlib
from PIL import Image
from diffusers import StableDiffusionImg2ImgPipeline
from config import *

print("Loading diffusion model...")

model_dtype = torch.float16 if DEVICE == "cuda" else torch.float32

pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
    BASE_MODEL,
    torch_dtype=model_dtype
).to(DEVICE)

pipe.load_lora_weights(LORA_PATH)

print("Model loaded successfully")


def generate_image(input_path, output_path):

    image = Image.open(input_path).convert("RGB").resize((512, 512))

    autocast_ctx = torch.autocast(DEVICE) if DEVICE == "cuda" else contextlib.nullcontext()

    with autocast_ctx:
        result = pipe(
            prompt=PROMPT,
            negative_prompt=NEGATIVE_PROMPT,
            image=image,
            strength=STRENGTH,
            guidance_scale=GUIDANCE_SCALE,
            num_inference_steps=NUM_STEPS
        ).images[0]

    result.save(output_path)

    return output_path