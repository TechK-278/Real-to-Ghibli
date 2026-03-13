# API Documentation

## Base URL

http://localhost:8000

---

## Generate Ghibli Image

POST /generate

### Request

multipart/form-data

image: uploaded file

### Example

curl -X POST http://localhost:8000/generate 
-F "image=@input.jpg"

### Response

Generated Ghibli styled image.
