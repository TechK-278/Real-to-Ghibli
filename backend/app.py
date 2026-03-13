from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS

from generator import generate_image
from upscaler import upscale_image
from config import *

app = Flask(__name__)
CORS(app)

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(UPSCALED_DIR, exist_ok=True)

@app.route("/outputs/<path:filename>")
def serve_outputs(filename):
    return send_from_directory(OUTPUT_DIR, filename)

@app.route("/upscaled/<path:filename>")
def serve_upscaled(filename):
    return send_from_directory(UPSCALED_DIR, filename)

@app.route("/generate", methods=["POST"])
def generate():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    input_path = os.path.join(UPLOAD_DIR, file.filename)
    output_path = os.path.join(OUTPUT_DIR, file.filename)
    upscaled_path = os.path.join(UPSCALED_DIR, file.filename)

    file.save(input_path)

    try:
        generate_image(input_path, output_path)
        upscale_image(output_path, upscaled_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({
        "generated": f"/outputs/{file.filename}",
        "upscaled": f"/upscaled/{file.filename}"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)