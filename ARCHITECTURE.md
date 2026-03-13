# 🏗️ System Architecture

## Overview

The Ghibli Art Generator follows a **client-server architecture** with three distinct layers: a browser-based frontend, a Python backend API, and an AI model inference engine.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│          (HTML / CSS / JavaScript)               │
│                                                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────────┐  │
│  │index.html│  │ script.js │  │  style.css   │  │
│  └──────────┘  └─────┬─────┘  └──────────────┘  │
│                      │                           │
└──────────────────────┼───────────────────────────┘
                       │ HTTP (multipart/form-data)
                       ▼
┌─────────────────────────────────────────────────┐
│                Backend (Python)                  │
│             Flask / FastAPI Server               │
│                                                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────┐  │
│  │  app.py  │  │ inference.py │  │  utils.py  │  │
│  └────┬─────┘  └──────┬───────┘  └───────────┘  │
│       │               │                          │
│       │        ┌──────┴───────┐                  │
│       │        │model_loader  │                  │
│       │        │    .py       │                  │
│       │        └──────┬───────┘                  │
└───────┼───────────────┼──────────────────────────┘
        │               │
        │               ▼
┌─────────────────────────────────────────────────┐
│              Model Layer (ONNX)                  │
│                                                  │
│         ghibli_diffusion.onnx                    │
│         (Diffusion Model)                        │
│                                                  │
│         ONNX Runtime Inference                   │
└─────────────────────────────────────────────────┘
```

---

## Component Details

### Frontend Layer

| File | Responsibility |
|------|----------------|
| `index.html` | Page structure, image upload form, result display area |
| `script.js` | Handles file upload, sends API requests, displays generated images |
| `style.css` | Visual styling and responsive layout |

**Communication**: The frontend sends images via `POST /generate` using `multipart/form-data` and receives the generated Ghibli-style image in the response.

---

### Backend Layer

| File | Responsibility |
|------|----------------|
| `app.py` | Entry point — initializes the web server, defines API routes, handles request/response lifecycle |
| `inference.py` | Runs the diffusion pipeline — preprocessing, model execution, and postprocessing |
| `model_loader.py` | Loads the ONNX model into memory using ONNX Runtime, manages session lifecycle |
| `utils.py` | Shared utility functions — image resizing, format conversion, file handling |

---

### Model Layer

* **Format**: ONNX (Open Neural Network Exchange)
* **Runtime**: ONNX Runtime (supports CPU and GPU)
* **Model File**: `models/ghibli_diffusion.onnx`

---

## Data Flow

```
1. User selects an image in the browser
2. Frontend sends image to POST /generate
3. app.py receives the request and saves to uploads/
4. inference.py preprocesses the image (resize, normalize)
5. model_loader.py provides the ONNX session
6. Diffusion model generates Ghibli-style output
7. inference.py postprocesses the result
8. app.py returns the generated image to the frontend
9. Frontend displays the result to the user
```

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| ONNX Runtime over PyTorch | Faster inference, lower memory, cross-platform |
| Flask / FastAPI | Lightweight, easy to deploy, Python-native |
| Vanilla HTML/CSS/JS frontend | No build step required, simple deployment |
| Separate `model_loader.py` | Isolates model lifecycle from inference logic |
| `uploads/` directory | Temporary storage for input images during processing |

---

## Related Documentation

* [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) — File tree
* [MODEL.md](MODEL.md) — Model details and pipeline
* [API.md](API.md) — API endpoint documentation
