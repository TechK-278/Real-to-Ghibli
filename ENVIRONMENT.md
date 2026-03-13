# 🔐 Environment Variables & Configuration

## Overview

The application uses environment variables for configuration. No `.env` file is required for local development with defaults, but production deployments should set these explicitly.

---

## Variable Reference

### Server Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `HOST` | Server bind address | `0.0.0.0` | `127.0.0.1` |
| `PORT` | Server port | `8000` | `5000` |
| `DEBUG` | Enable debug mode | `true` | `false` |
| `WORKERS` | Number of server workers | `1` | `4` |

### Model Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `MODEL_PATH` | Path to the ONNX model file | `models/ghibli_diffusion.onnx` | `/opt/models/model.onnx` |
| `ONNX_DEVICE` | Inference device | `cpu` | `cuda` |
| `NUM_DIFFUSION_STEPS` | Number of diffusion steps | `50` | `30` |

### Upload Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `UPLOAD_DIR` | Directory for uploaded images | `uploads/` | `/tmp/uploads/` |
| `MAX_UPLOAD_SIZE` | Max upload file size (bytes) | `10485760` (10 MB) | `20971520` (20 MB) |
| `ALLOWED_EXTENSIONS` | Accepted file types | `jpg,png,webp` | `jpg,png` |

### CORS Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `CORS_ORIGINS` | Allowed CORS origins | `*` | `https://yourdomain.com` |

---

## Setting Environment Variables

### Linux / macOS

```bash
export ONNX_DEVICE=cuda
export PORT=5000
export DEBUG=false
python backend/app.py
```

### Windows (PowerShell)

```powershell
$env:ONNX_DEVICE = "cuda"
$env:PORT = "5000"
$env:DEBUG = "false"
python backend/app.py
```

### Using a `.env` File

Create a `.env` file in the project root:

```env
HOST=0.0.0.0
PORT=8000
DEBUG=false
ONNX_DEVICE=cpu
MODEL_PATH=models/ghibli_diffusion.onnx
MAX_UPLOAD_SIZE=10485760
CORS_ORIGINS=https://yourdomain.com
```

Load it with `python-dotenv`:

```python
from dotenv import load_dotenv
load_dotenv()
```

### Docker

```bash
docker run -p 8000:8000 \
  -e ONNX_DEVICE=cuda \
  -e DEBUG=false \
  -e MAX_UPLOAD_SIZE=20971520 \
  ghibli-art-generator
```

---

## Configuration Precedence

Environment variables take priority over defaults:

```
1. Environment variable (highest priority)
2. .env file
3. Application default (lowest priority)
```

---

## Related Documentation

* [INSTALLATION.md](INSTALLATION.md) — Local setup
* [DEPLOYMENT.md](DEPLOYMENT.md) — Production deployment
* [SECURITY.md](SECURITY.md) — Security configuration
