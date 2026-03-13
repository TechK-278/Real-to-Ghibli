# 🚀 Deployment Guide

## Local Development

See [INSTALLATION.md](INSTALLATION.md) for local setup instructions.

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY models/ ./models/

RUN mkdir -p uploads

EXPOSE 8000

CMD ["python", "backend/app.py"]
```

### Build and Run

```bash
# Build the image
docker build -t ghibli-art-generator .

# Run the container
docker run -p 8000:8000 ghibli-art-generator

# Run with GPU support (NVIDIA)
docker run --gpus all -p 8000:8000 ghibli-art-generator
```

---

## Docker Compose

```yaml
version: "3.8"

services:
  ghibli-app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./uploads:/app/uploads
    environment:
      - ONNX_DEVICE=cpu
      - MAX_UPLOAD_SIZE=10485760
    restart: unless-stopped
```

```bash
docker-compose up -d
```

---

## Cloud Deployment

### AWS (EC2)

1. Launch an EC2 instance (recommended: `g4dn.xlarge` for GPU)
2. Install Docker on the instance
3. Clone the repository and build the Docker image
4. Configure security group to allow port `8000`
5. Run the container

### Google Cloud Run

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/ghibli-art-generator

# Deploy
gcloud run deploy ghibli-art-generator \
  --image gcr.io/PROJECT_ID/ghibli-art-generator \
  --port 8000 \
  --memory 4Gi \
  --cpu 2
```

### Heroku

```bash
heroku create ghibli-art-generator
heroku stack:set container
git push heroku main
```

---

## Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 10M;
    }
}
```

---

## Production Checklist

- [ ] Set `DEBUG=false` in environment
- [ ] Configure CORS for your domain
- [ ] Set up HTTPS (SSL/TLS)
- [ ] Configure file upload size limits
- [ ] Set up log rotation
- [ ] Enable health check endpoint
- [ ] Configure auto-restart on crash
- [ ] Set resource limits (memory, CPU)

---

## Related Documentation

* [INSTALLATION.md](INSTALLATION.md) — Local development setup
* [ENVIRONMENT.md](ENVIRONMENT.md) — Environment variables
* [SECURITY.md](SECURITY.md) — Security considerations
