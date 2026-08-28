# Boardify 🩺

> **High-Yield Medical Q-Bank & Exam Simulator** (USMLE / MRCP / PLAB / UKMLA)

Boardify is a high-performance clinical question bank and exam simulator built for high-stakes medical examination prep.

---

## ✨ Features

- **Clinical Exam Simulator**: Full USMLE / MRCP simulation workflow with timers, strike-through, highlighters, score breakdown, and rationales.
- **11+ Handcrafted Clinical Palettes**: Tailored color themes (Academic Navy, Surgeon Blue, Forest Scrub, Slate Minimal, etc.) with seamless Dark/Light modes.
- **Dual-Script & Fluid Typography**: Precision reading scales (Jakarta, Inter, Newsreader Serif, etc.) designed for cognitive ease during marathon test sessions.
- **Interactive Token Workbench & Live Previews**: Real-time theme customization and responsive preview engine.
- **Zero-Dependency Core**: Lightweight, ultra-fast client-side execution.

---

## 🚀 Live Demo

You can open `index.html` directly in any modern web browser or run with any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

---

## 📁 Project Structure

```
Boardify/
├── index.html              # Main application shell (Landing + Simulator views)
├── tailwind.config.ts      # Token definitions & Tailwind extensions
├── css/
│   ├── main.css            # Core utilities & base reset
│   ├── landing.css         # Landing page showcase styling
│   ├── tokens.css          # Design tokens, variables & palettes
│   └── uworld.css          # Exam simulator UI & testing styles
└── js/
    ├── app.js              # View switcher & routing
    ├── theme.js            # Theme, mode & typography engine
    ├── simulator.js        # Exam engine & state management
    ├── questions.js        # High-yield clinical question bank
    └── DesignEngineProvider.tsx # Token workbench provider
```

---

## 📜 License

MIT License. Designed with excellence for medical education.
