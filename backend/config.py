BASE_MODEL = "runwayml/stable-diffusion-v1-5"

PROMPT = (
    "masterpiece, best quality, ultra-detailed, studio ghibli style, "
    "anime art, beautiful landscape, vibrant colors, soft painterly brushstrokes, "
    "magical atmosphere, cinematic lighting, highly detailed environment"
)

NEGATIVE_PROMPT = (
    "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, "
    "fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, "
    "signature, watermark, username, blurry, artist name, realistic, photorealistic, 3d, cgi"
)

STRENGTH = 0.76
GUIDANCE_SCALE = 7.6
NUM_STEPS = 30

import torch

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

LORA_PATH = "models/lora_genshin_ghibli"
UPSCALE_MODEL = "models/Real-ESRGAN-x4plus.onnx"

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
UPSCALED_DIR = "upscaled"