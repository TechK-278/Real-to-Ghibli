# 🧪 Testing Strategy

## Overview

Testing ensures the Ghibli Art Generator works correctly across the API, model inference, and frontend layers.

---

## Test Structure

```
tests/
├── test_api.py           # API endpoint tests
├── test_inference.py     # Model inference tests
├── test_utils.py         # Utility function tests
├── test_model_loader.py  # Model loading tests
└── fixtures/
    └── sample_input.jpg  # Test image fixture
```

---

## Running Tests

```bash
# Install test dependencies
pip install pytest pytest-cov httpx

# Run all tests
pytest

# Run with coverage report
pytest --cov=backend --cov-report=html

# Run a specific test file
pytest tests/test_api.py

# Run with verbose output
pytest -v
```

---

## Test Categories

### Unit Tests

Test individual functions in isolation.

```python
# Example: test_utils.py
def test_resize_image():
    """Image should be resized to target dimensions."""
    img = load_test_image("fixtures/sample_input.jpg")
    resized = resize_image(img, width=512, height=512)
    assert resized.size == (512, 512)

def test_validate_file_type():
    """Only JPG, PNG, and WEBP should be accepted."""
    assert validate_file_type("photo.jpg") is True
    assert validate_file_type("document.pdf") is False
```

### Integration Tests

Test the API endpoints end-to-end.

```python
# Example: test_api.py
def test_generate_endpoint(client):
    """POST /generate should return a valid image."""
    with open("tests/fixtures/sample_input.jpg", "rb") as f:
        response = client.post("/generate", files={"image": f})

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("image/")

def test_generate_no_file(client):
    """POST /generate without a file should return 400."""
    response = client.post("/generate")
    assert response.status_code == 400
```

### Model Tests

Verify model loading and inference.

```python
# Example: test_model_loader.py
def test_model_loads_successfully():
    """ONNX model should load without errors."""
    session = load_model("models/ghibli_diffusion.onnx")
    assert session is not None

def test_inference_output_shape():
    """Model output should have expected dimensions."""
    result = run_inference(sample_image)
    assert result.shape[0] > 0
    assert result.shape[1] > 0
```

---

## Code Coverage

Aim for the following coverage targets:

| Component | Target |
|-----------|--------|
| `utils.py` | 90%+ |
| `model_loader.py` | 80%+ |
| `inference.py` | 70%+ |
| `app.py` (API routes) | 85%+ |

---

## Continuous Integration

Add testing to your CI pipeline:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.10"
      - run: pip install -r backend/requirements.txt
      - run: pip install pytest pytest-cov
      - run: pytest --cov=backend
```

---

## Related Documentation

* [CONTRIBUTING.md](CONTRIBUTING.md) — Contribution guidelines
* [ARCHITECTURE.md](ARCHITECTURE.md) — System design context
