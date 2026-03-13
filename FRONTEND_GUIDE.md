# 🎨 Frontend Guide

## Overview

The frontend is a lightweight **vanilla HTML/CSS/JavaScript** application that provides the user interface for uploading images and viewing generated Ghibli-style artwork. No build tools or frameworks are required.

---

## File Structure

```
frontend/
├── index.html    # Page structure and layout
├── script.js     # Application logic and API communication
└── style.css     # Styling and responsive design
```

---

## Components

### `index.html`

The main HTML page containing:

| Section | Description |
|---------|-------------|
| Header | Application title and branding |
| Upload Area | Drag-and-drop zone or file input for image selection |
| Preview | Displays the uploaded image before processing |
| Generate Button | Triggers the API call to generate Ghibli art |
| Result Display | Shows the generated Ghibli-style image |
| Loading Indicator | Visual feedback during image processing |

---

### `script.js`

Handles all client-side logic:

| Function | Purpose |
|----------|---------|
| `handleFileUpload()` | Captures the selected image file |
| `previewImage()` | Displays the uploaded image in the preview area |
| `generateImage()` | Sends the image to `POST /generate` and displays the result |
| `showLoading()` | Shows/hides the loading spinner |
| `handleError()` | Displays user-friendly error messages |

**API Communication**:

```javascript
async function generateImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Generation failed");

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById("result").src = imageUrl;
}
```

---

### `style.css`

Styling guidelines:

| Aspect | Details |
|--------|---------|
| Layout | Centered single-column layout |
| Color Scheme | Ghibli-inspired warm, natural tones |
| Responsive | Mobile-friendly with media queries |
| Upload Area | Dashed border with hover effects |
| Animations | Smooth transitions for loading states |

---

## User Flow

```
1. User opens index.html in a browser
2. User drags an image (or clicks to browse)
3. Preview of the uploaded image appears
4. User clicks "Generate Ghibli Art"
5. Loading spinner appears
6. Generated image is displayed alongside the original
7. User can download or upload another image
```

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |
| Internet Explorer | ❌ |

---

## Customization

### Changing the API URL

Update the base URL in `script.js`:

```javascript
const API_BASE_URL = "http://localhost:8000";
// Change to your production URL:
// const API_BASE_URL = "https://api.yourdomain.com";
```

### Changing Styles

Edit `style.css` to customize:
- Colors: update CSS custom properties / variables
- Layout: modify flexbox/grid configurations
- Fonts: import from Google Fonts in `index.html`

---

## Development Tips

- Open `index.html` directly in a browser for quick testing
- Use browser DevTools (`F12`) to debug JavaScript and inspect network requests
- Test with various image sizes and formats
- Check the Console tab for error messages

---

## Related Documentation

* [ARCHITECTURE.md](ARCHITECTURE.md) — How frontend connects to backend
* [API.md](API.md) — API endpoint details
* [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — Common frontend issues
