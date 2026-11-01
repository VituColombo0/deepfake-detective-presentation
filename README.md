# Deepfake Detective: Synthetic Media Forensic Inspector

An interactive, client-side visual forensics tool designed for demonstrations, educational presentations, and technical training on detecting AI-generated portraits and deepfake artifacts.

[![Tech: Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20JS%20%2F%20HTML5-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS: CSS3 Variables](https://img.shields.io/badge/Styling-Modern%20CSS3-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Dependencies: Zero](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Web)-brightgreen.svg)](https://github.com/VituColombo0/deepfake-detective-presentation)
[![Architecture: Client-side](https://img.shields.io/badge/Architecture-100%25%20Static-blue.svg)](https://github.com/VituColombo0/deepfake-detective-presentation)

---

## Overview

Modern generative models (such as StyleGAN2/3 and Diffusion architectures) produce photorealistic human faces but consistently leave micro-artifacts governed by generative flaws and physical inconsistencies.

**Deepfake Detective** presents a curated side-by-side comparison interface (Authentic Portrait vs. Synthetic Image) equipped with interactive annotation hotspots that pinpoint specific artifacts invisible to casual inspection.

---

## Forensic Criteria Matrix

The tool categorizes 11 fundamental visual discrepancies frequently present in synthetic portraits:

| Category | Forensic Indicator | Artifact Mechanism in Generative Models |
| :--- | :--- | :--- |
| **1. Pupil & Iris Geometry** | Oval or non-concentric pupils | GANs struggle with fine circular geometry and bilateral corneal reflection alignment. |
| **2. Dental Symmetry** | Overly uniform or merged teeth | Difficulty in modeling individual dental separations and natural enamel wear patterns. |
| **3. Fabric Textures** | Melted or morphing textiles | Convolutions often blur repeated intricate weaves, seams, and collar stitching. |
| **4. Background Coherence** | Warped straight lines and patterns | Latent space blending produces non-Euclidean perspective distortions in architectural backgrounds. |
| **5. Synthetic Typography** | Pseudo-alphabetic glyphs | Generative layers assemble letter-like shapes without semantic linguistic consistency. |
| **6. Specular Reflections** | Discordant reflections in lenses | Mismatched reflections between left and right sunglass lenses or rear mirrors. |
| **7. Lighting Physics** | Contradictory shadow vectors | Highlights and shadows that disobey single-source or ambient illumination vectors. |
| **8. Hands & Peripheries** | Polydactyly or fused knuckles | High degree of mechanical freedom makes hand synthesis a common failure mode. |
| **9. Hair Boundary Transitions** | Discontinuous hair strands | Hair tips dissolving directly into skin or fading abruptly into background bokeh. |
| **10. Accessory Asymmetry** | Mismatched earrings / frames | Eyeglass hinges differing in shape, color, or vanishing entirely behind the nose bridge. |
| **11. Edge Blending** | Micro-blur along facial perimeters | Boundary artifacts where foreground face masks merge with background textures. |

---

## Key Interface Features

- **Side-by-Side Verification:** Direct comparison of genuine photography against algorithmic output.
- **Exploratory Hotspots:** Interactive focal points that reveal forensic explanations upon click or hover.
- **Zero-Dependency Architecture:** Built with pure standards-compliant HTML5, CSS3, and JavaScript — no package managers, build steps, or external libraries required.
- **Dark Theme Ergonomics:** High-contrast palette designed for conference presentations, projectors, and laboratory review.

---

## Local Setup

Since the application requires no compilers or build tools, it can be served using any local HTTP daemon:

### Using Python 3

```bash
# Clone repository
git clone https://github.com/VituColombo0/deepfake-detective-presentation.git
cd deepfake-detective-presentation

# Start HTTP server
python3 -m http.server 8080
```
Open `http://localhost:8080` in any modern web browser.

### Using Node.js / npx

```bash
npx serve .
```

---

## Adding Custom Cases

New cases can be configured directly in `script.js` inside the `cases` array:

```javascript
{
    icon: '🔍',
    title: 'Custom Forensic Case',
    real: 'images/real_custom.png',
    fake: 'images/fake_custom.png',
    hotspots: [
        {
            top: 45,        // Vertical percentage (0-100)
            left: 55,       // Horizontal percentage (0-100)
            label: 'Detailed forensic observation of the artifact'
        }
    ]
}
```

Image assets should be stored under `images/` as compressed PNG or WebP files.

---

## Project Structure

```text
deepfake-detective-presentation/
├── images/           # Curated dataset of real portraits and synthetic artifacts
├── index.html        # Semantic HTML5 layout and view containers
├── styles.css        # CSS3 variables, split layout, and hotspot animations
├── script.js         # Case state management, hotspot placement, and event handlers
└── README.md         # Technical documentation
```

---

## License

Educational and research project. Image samples are used under Fair Use for academic and forensic demonstration purposes.
