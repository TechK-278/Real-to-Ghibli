# ⚡ Performance & Optimization

## Overview

Performance is critical for a real-time image generation application. This document covers benchmarks, optimization techniques, and best practices.

---

## Benchmarks

### Inference Time (Single Image, 512×512)

| Device | Runtime | Avg. Time |
|--------|---------|-----------|
| CPU (Intel i7) | ONNX Runtime | ~15–30s |
| GPU (NVIDIA RTX 3060) | ONNX Runtime + CUDA | ~3–8s |
| GPU (NVIDIA A100) | ONNX Runtime + CUDA | ~1–3s |

> **Note**: Times vary based on model complexity, image resolution, and diffusion steps.

---

## ONNX Runtime Optimizations

### Why ONNX?

| Feature | PyTorch (Native) | ONNX Runtime |
|---------|-------------------|--------------|
| Startup Time | Slower | Faster |
| Inference Speed | Baseline | 1.5–3x faster |
| Memory Usage | Higher | Lower |
| Cross-platform | Limited | Broad |
| GPU Required | Often | Optional |

### Optimization Techniques

1. **Graph Optimization**: ONNX Runtime automatically applies graph-level optimizations (constant folding, node fusion)
2. **Quantization**: Reduce model size and speed up inference with INT8 quantization
3. **Execution Providers**: Choose the best provider for your hardware

```python
import onnxruntime as ort

# CPU optimized
session = ort.InferenceSession(
    "model.onnx",
    providers=["CPUExecutionProvider"]
)

# GPU accelerated
session = ort.InferenceSession(
    "model.onnx",
    providers=["CUDAExecutionProvider", "CPUExecutionProvider"]
)
```

---

## Image Preprocessing Optimization

| Technique | Impact |
|-----------|--------|
| Resize input to 512×512 before inference | Reduces computation significantly |
| Use Pillow with LANCZOS resampling | Best quality-to-speed ratio |
| Convert to RGB before processing | Avoids channel mismatch errors |
| Batch preprocessing with NumPy | Faster than per-pixel operations |

---

## Caching Strategies

### Model Caching

Load the model **once at startup** and reuse the session across requests:

```python
# ✅ Good — load once
model_session = load_model("models/ghibli_diffusion.onnx")

@app.post("/generate")
def generate(image):
    return run_inference(model_session, image)

# ❌ Bad — load per request
@app.post("/generate")
def generate(image):
    session = load_model("models/ghibli_diffusion.onnx")
    return run_inference(session, image)
```

### Result Caching

For repeated inputs, consider caching generated images using a hash of the input:

```python
import hashlib

def get_cache_key(image_bytes):
    return hashlib.sha256(image_bytes).hexdigest()
```

---

## Resource Management

### Memory

- Monitor memory usage during inference
- Set `OMP_NUM_THREADS` to limit CPU thread usage
- Use `gc.collect()` after large inference batches

### Concurrent Requests

- Use async frameworks (FastAPI with `asyncio`) for I/O-bound tasks
- Limit concurrent inference to avoid GPU memory exhaustion
- Consider a task queue (Celery, Redis Queue) for high-traffic deployments

---

## Monitoring

Track these metrics in production:

| Metric | Tool |
|--------|------|
| Inference latency (p50, p95, p99) | Prometheus / custom logging |
| Memory usage | `psutil` / Docker stats |
| Request throughput | Nginx logs / API middleware |
| Error rate | Structured logging |
| GPU utilization | `nvidia-smi` / DCGM |

---

## Related Documentation

* [MODEL.md](MODEL.md) — Model format and pipeline
* [ARCHITECTURE.md](ARCHITECTURE.md) — System design
* [DEPLOYMENT.md](DEPLOYMENT.md) — Production deployment
