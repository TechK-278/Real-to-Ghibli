# 🔧 Troubleshooting

Common issues and their solutions.

---

## Installation Issues

### `pip install` fails with ONNX Runtime errors

**Problem**: `onnxruntime` fails to install or import.

**Solutions**:
- Ensure Python 3.8+ is installed: `python --version`
- Use the CPU-only package: `pip install onnxruntime`
- For GPU support: `pip install onnxruntime-gpu`
- Upgrade pip: `pip install --upgrade pip`

---

### Virtual environment not activating (Windows)

**Problem**: `venv\Scripts\activate` shows a permission error.

**Solution**: Run PowerShell as Administrator, then execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Runtime Issues

### Model file not found

**Problem**: `FileNotFoundError: models/ghibli_diffusion.onnx`

**Solutions**:
- Verify the model file exists in the `models/` directory
- Check the file path in `model_loader.py`
- Re-download the model if corrupted

---

### Out of Memory (OOM) errors

**Problem**: Process crashes with memory errors during inference.

**Solutions**:
- Reduce input image resolution before processing
- Use CPU inference instead of GPU: set `ONNX_DEVICE=cpu`
- Increase system swap space
- Close other memory-intensive applications

---

### CUDA / GPU not detected

**Problem**: ONNX Runtime defaults to CPU even with a GPU available.

**Solutions**:
- Install `onnxruntime-gpu` instead of `onnxruntime`
- Verify CUDA installation: `nvidia-smi`
- Ensure CUDA version is compatible with `onnxruntime-gpu`
- Check CUDA toolkit: `nvcc --version`

---

## API Issues

### CORS errors in browser

**Problem**: Browser blocks requests to `http://localhost:8000`.

**Solution**: Enable CORS in the backend:

```python
# Flask
from flask_cors import CORS
CORS(app)

# FastAPI
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"])
```

---

### File upload fails (413 / file too large)

**Problem**: Server rejects large image uploads.

**Solutions**:
- Increase upload limit in the backend config
- Set `MAX_UPLOAD_SIZE` environment variable
- If using Nginx, increase `client_max_body_size`

---

### Server won't start (port in use)

**Problem**: `Address already in use: 8000`

**Solutions**:

```bash
# Find the process using port 8000
# Linux/Mac
lsof -i :8000

# Windows
netstat -ano | findstr :8000

# Kill the process or use a different port
python app.py --port 8001
```

---

## Frontend Issues

### Uploaded image not displaying

**Problem**: The preview of the uploaded image doesn't appear.

**Solutions**:
- Check browser console for JavaScript errors (`F12`)
- Verify the image format is supported (JPG, PNG, WEBP)
- Clear browser cache and refresh

---

### Generated image not rendering

**Problem**: API returns successfully but image doesn't display.

**Solutions**:
- Check the response content type in browser DevTools
- Verify the image blob URL is being created correctly in `script.js`
- Try a different browser

---

## Getting Further Help

If your issue isn't listed here:

1. Check the [GitHub Issues](https://github.com/yourusername/ghibli-art-generator/issues) page
2. Create a new issue with:
   - Steps to reproduce the problem
   - Error message (full traceback)
   - Python version and OS
   - ONNX Runtime version (`pip show onnxruntime`)
