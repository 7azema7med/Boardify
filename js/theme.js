/* ==========================================================================
   BOARDIFY DESIGN SYSTEM & THEME ENGINE (v2.5)
   11+ Clinical Palettes, English Clinical Typography, Parametric Shapes & Token Workbench
   ========================================================================== */

const THEMES = {
  'academic-navy': {
    id: 'academic-navy',
    name: 'Academic Navy & Royal',
    accentColor: '#0A1F44',
    darkPrimary: '#437EEB',
    description: 'Gold-standard clinical authority and deep focus for NBME & USMLE.',
    badge: 'Clinical Authority',
    category: 'Clinical Core',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#437EEB' : '#0A1F44';
      const aColor = isDark ? '#F59E0B' : '#D97706';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect width="40" height="40" rx="8" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.1'}" class="logo-shield-border" stroke="${pColor}" stroke-width="1.5"/>
          <path d="M12 9H22C25.3 9 28 11.7 28 15C28 17.3 26.7 19.2 24.8 20.2C27.2 21.2 29 23.5 29 26.2C29 30 25.9 33 22.2 33H12V9Z" stroke="${pColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 21H22C24.2 21 26 19.2 26 17C26 14.8 24.2 13 22 13H12" stroke="${pColor}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M12 30L15 28L18 32L21 26L24 30H27" stroke="${aColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-ekg-path"/>
          <circle cx="27" cy="12" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'digital-slate': {
    id: 'digital-slate',
    name: 'Digital Slate & Cyan',
    accentColor: '#0F172A',
    darkPrimary: '#06B6D4',
    description: 'High-tech diagnostic SaaS feel with surgical cyan accents.',
    badge: 'High-Tech SaaS',
    category: 'High-Tech',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#06B6D4' : '#0F172A';
      const aColor = isDark ? '#22D3EE' : '#0891B2';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect width="40" height="40" rx="8" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.08'}" stroke="${pColor}" stroke-width="1.8" class="logo-shield-border"/>
          <path d="M10 20H15L18 12L22 28L25 16L28 20H32" stroke="${aColor}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="logo-ekg-path"/>
          <circle cx="20" cy="20" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'clinical-teal': {
    id: 'clinical-teal',
    name: 'Clinical Deep Teal',
    accentColor: '#0F766E',
    darkPrimary: '#2DD4BF',
    description: 'Surgical theatre precision with calm antiseptic clarity.',
    badge: 'Surgical Precision',
    category: 'Surgical & Specialty',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#2DD4BF' : '#0F766E';
      const aColor = isDark ? '#5EEAD4' : '#C2410C';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <path d="M20 4L7 9V20C7 28.5 12.5 35.8 20 38C27.5 35.8 33 28.5 33 20V9L20 4Z" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.1'}" stroke="${pColor}" stroke-width="2" stroke-linejoin="round" class="logo-shield-border"/>
          <path d="M20 11V29" stroke="${pColor}" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M11 20H29" stroke="${pColor}" stroke-width="2.6" stroke-linecap="round"/>
          <circle cx="20" cy="20" r="3.5" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'forest-emerald': {
    id: 'forest-emerald',
    name: 'Focused Forest Emerald',
    accentColor: '#064E3B',
    darkPrimary: '#10B981',
    description: 'Lancet & British medical journal aesthetic designed for marathon study.',
    badge: 'Cognitive Calm',
    category: 'Clinical Core',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#10B981' : '#064E3B';
      const aColor = isDark ? '#34D399' : '#B45309';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" stroke="${pColor}" stroke-width="2" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.08'}" class="logo-shield-border"/>
          <path d="M13 20L18 25L27 15" stroke="${pColor}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="20" cy="8" r="2.5" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'crimson-urgency': {
    id: 'crimson-urgency',
    name: 'High-Yield Crimson & Harvard',
    accentColor: '#881337',
    darkPrimary: '#FB7185',
    description: 'High-acuity clinical alert styling with ivy league heritage crimson.',
    badge: 'High-Yield Priority',
    category: 'Clinical Core',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#FB7185' : '#881337';
      const aColor = isDark ? '#FDA4AF' : '#D97706';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect x="3" y="3" width="34" height="34" rx="8" stroke="${pColor}" stroke-width="2" fill="${pColor}" fill-opacity="${isDark ? '0.15' : '0.08'}" class="logo-shield-border"/>
          <path d="M20 7V33" stroke="${pColor}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M13 13C17 11 23 11 27 13C27 20 13 20 13 27C17 29 23 29 27 27" stroke="${aColor}" stroke-width="2.4" stroke-linecap="round" fill="none" class="logo-ekg-path"/>
          <circle cx="20" cy="7" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'mayo-violet': {
    id: 'mayo-violet',
    name: 'Mayo Royal Violet',
    accentColor: '#3730A3',
    darkPrimary: '#818CF8',
    description: 'Deep diagnostic iris wavelength to reduce ocular fatigue during 8-hour blocks.',
    badge: 'Diagnostic Focus',
    category: 'Surgical & Specialty',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#818CF8' : '#3730A3';
      const aColor = isDark ? '#A5B4FC' : '#C2410C';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect width="40" height="40" rx="10" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.1'}" stroke="${pColor}" stroke-width="1.8" class="logo-shield-border"/>
          <circle cx="14" cy="14" r="5" stroke="${pColor}" stroke-width="2"/>
          <circle cx="26" cy="26" r="5" stroke="${pColor}" stroke-width="2"/>
          <path d="M18 18L22 22" stroke="${pColor}" stroke-width="2.5" stroke-linecap="round" class="logo-ekg-path"/>
          <circle cx="20" cy="20" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'nordic-titanium': {
    id: 'nordic-titanium',
    name: 'Nordic Titanium & Polar Azure',
    accentColor: '#0284C7',
    darkPrimary: '#38BDF8',
    description: 'Scandinavian minimalist surgical elegance with high-contrast polar azure.',
    badge: 'Precision Cyan',
    category: 'High-Tech',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#38BDF8' : '#0284C7';
      const aColor = isDark ? '#FBBF24' : '#D97706';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <polygon points="20,3 36,12 36,28 20,37 4,28 4,12" stroke="${pColor}" stroke-width="2" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.08'}" class="logo-shield-border"/>
          <path d="M8 20H14L17 12L21 28L24 16L27 20H32" stroke="${pColor}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="logo-ekg-path"/>
          <circle cx="20" cy="20" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'golden-caduceus': {
    id: 'golden-caduceus',
    name: 'Golden Caduceus & Amber',
    accentColor: '#92400E',
    darkPrimary: '#F59E0B',
    description: 'Warm gold-tier distinction tokenizing board honors and mastery.',
    badge: 'Board Distinction',
    category: 'Surgical & Specialty',
    wcag: 'AA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#F59E0B' : '#92400E';
      const aColor = isDark ? '#FDE68A' : '#D97706';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <circle cx="20" cy="20" r="17" stroke="${pColor}" stroke-width="2" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.1'}" class="logo-shield-border"/>
          <path d="M20 8V32" stroke="${pColor}" stroke-width="2.4" stroke-linecap="round"/>
          <circle cx="20" cy="8" r="4" fill="${aColor}"/>
          <path d="M12 16C16 14 24 14 28 16M12 24C16 22 24 22 28 24" stroke="${pColor}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
  },
  'obsidian-diagnostic': {
    id: 'obsidian-diagnostic',
    name: 'Obsidian Diagnostic (Night Shift)',
    accentColor: '#18181B',
    darkPrimary: '#E4E4E7',
    description: 'Stealth low-luminance palette designed for on-call overnight stamina.',
    badge: 'Night Shift Ergonomics',
    category: 'Ergonomic',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#E4E4E7' : '#18181B';
      const aColor = '#38BDF8';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect width="40" height="40" rx="8" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.08'}" stroke="${pColor}" stroke-width="2" class="logo-shield-border"/>
          <circle cx="20" cy="20" r="8" stroke="${aColor}" stroke-width="2.2"/>
          <circle cx="20" cy="20" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'bio-sage': {
    id: 'bio-sage',
    name: 'Bio-Sage & Arctic Frost',
    accentColor: '#2E3440',
    darkPrimary: '#88C0D0',
    description: 'Neurological cognitive balance inspired by Nordic clinical laboratories.',
    badge: 'Cognitive Balance',
    category: 'Ergonomic',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#88C0D0' : '#2E3440';
      const aColor = isDark ? '#EBCB8B' : '#5E81AC';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect width="40" height="40" rx="10" stroke="${pColor}" stroke-width="1.8" fill="${pColor}" fill-opacity="${isDark ? '0.15' : '0.08'}" class="logo-shield-border"/>
          <path d="M12 28C14 18 26 18 28 28" stroke="${pColor}" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="20" cy="14" r="4" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  },
  'task-os-amber': {
    id: 'task-os-amber',
    name: 'Task OS Amber & Cyber Gold',
    accentColor: '#A16207',
    darkPrimary: '#F59E0B',
    description: 'High-contrast clinical workspace with amber gold accents and deep dark slate mode.',
    badge: 'Task OS Cyber Gold',
    category: 'High-Tech SaaS',
    wcag: 'AAA',
    getLogoSvg: (isDark) => {
      const pColor = isDark ? '#F59E0B' : '#A16207';
      const aColor = isDark ? '#FBBF24' : '#D97706';
      return `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="boardify-animated-logo">
          <rect width="40" height="40" rx="8" stroke="${pColor}" stroke-width="1.8" fill="${pColor}" fill-opacity="${isDark ? '0.2' : '0.08'}" class="logo-shield-border"/>
          <path d="M10 24V16" stroke="${aColor}" stroke-width="3" stroke-linecap="round"/>
          <path d="M16 24V12" stroke="${pColor}" stroke-width="3" stroke-linecap="round"/>
          <path d="M22 24V8" stroke="${aColor}" stroke-width="3" stroke-linecap="round"/>
          <circle cx="30" cy="12" r="3" fill="${aColor}" class="logo-pulse-dot"/>
        </svg>
      `;
    }
  }
};

const FONT_PAIRINGS = {
  'taskos-mono': {
    id: 'taskos-mono',
    name: 'Fira Code + Space Grotesk',
    tag: 'Task OS Monospace Precision',
    script: 'English',
    description: 'Terminal-grade monospace precision typography with modern geometric sans for peak diagnostic focus.'
  },
  'arabic-taskos': {
    id: 'arabic-taskos',
    name: 'IBM Plex Sans Arabic + Space Grotesk',
    tag: 'Task OS Arabic Clean',
    script: 'Arabic / Dual',
    description: 'Crisp bilingual Arabic interface typography engineered for high-yield diagnostic clarity.'
  },
  'jakarta-serif': {
    id: 'jakarta-serif',
    name: 'Plus Jakarta Sans + Source Serif 4',
    tag: 'Modern Clinical Standard',
    script: 'English',
    description: 'High-contrast neo-grotesque UI with authoritative serif vignettes for NBME readability.'
  },
  'inter-lora': {
    id: 'inter-lora',
    name: 'Inter + Lora',
    tag: 'Biomedical Tech',
    script: 'English',
    description: 'World-class interface readability combined with elegant literary serif for reduced eye strain.'
  },
  'geist-plex': {
    id: 'geist-plex',
    name: 'Geist + IBM Plex Serif',
    tag: 'High-Precision Tech',
    script: 'English',
    description: 'Ultra-crisp sub-pixel rendering with sharp academic medical vignettes.'
  },
  'space-newsreader': {
    id: 'space-newsreader',
    name: 'Space Grotesk + Newsreader',
    tag: 'Editorial Lancet / BMJ',
    script: 'English',
    description: 'Prestigious journal typography engineered for deep diagnostic concentration.'
  },
  'cabinet-fraunces': {
    id: 'cabinet-fraunces',
    name: 'Cabinet Grotesk + Fraunces',
    tag: 'Oxford Academic Heritage',
    script: 'English',
    description: 'Warm collegiate display serif combined with tight, space-efficient question stems.'
  },
  'lexend-serif': {
    id: 'lexend-serif',
    name: 'Lexend Deca + Source Serif 4',
    tag: 'Dyslexia Ergonomics',
    script: 'English',
    description: 'Scientifically tuned glyph spacing to accelerate saccadic eye movement and reading speed.'
  },
  'jetbrains-sans': {
    id: 'jetbrains-sans',
    name: 'JetBrains Mono + Plus Jakarta Sans',
    tag: 'Diagnostic High-Density UI',
    script: 'English',
    description: 'Monospace precision metrics for lab panels and vital signs with clean sans vignettes.'
  },
  'times-classic': {
    id: 'times-classic',
    name: 'Times New Roman + Source Serif',
    tag: 'NBME Paper Heritage',
    script: 'English',
    description: 'The definitive classic academic and traditional board examination paper typeface.'
  }
};

const SHAPES = {
  sharp: { id: 'sharp', name: 'Sharp (0px)', radius: '0px', desc: 'Monolithic Precision Dashboard' },
  subtle: { id: 'subtle', name: 'Subtle (6px)', radius: '6px', desc: 'Compact Clinical Desktop' },
  native: { id: 'native', name: 'Native App (8px)', radius: '8px', desc: 'Standard Native Software' },
  modern: { id: 'modern', name: 'Modern (14px)', radius: '14px', desc: 'Card-Based Q-Bank' },
  organic: { id: 'organic', name: 'Organic (22px)', radius: '22px', desc: 'Tactile Soft Modern' },
  pill: { id: 'pill', name: 'Pill / Capsule', radius: '9999px', desc: 'Rounded Action Badges' }
};

const ELEVATIONS = {
  flat: { id: 'flat', name: 'Flat (Border Only)' },
  subtle: { id: 'subtle', name: 'Subtle Ambient (1 Layer)' },
  layered: { id: 'layered', name: 'Layered (2 Layers - Standard)' },
  floating: { id: 'floating', name: 'Floating (3 Layers - High Depth)' }
};

class ThemeEngine {
  constructor() {
    this.currentTheme = localStorage.getItem('boardify_theme') || 'task-os-amber';
    this.currentMode = localStorage.getItem('boardify_mode') || 'light';
    this.currentFont = localStorage.getItem('boardify_font') || 'taskos-mono';
    this.currentShape = localStorage.getItem('boardify_shape') || 'native';
    this.currentElevation = localStorage.getItem('boardify_elevation') || 'layered';
    this.currentDirection = 'ltr';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme, this.currentMode);
    this.applyFont(this.currentFont);
    this.applyShape(this.currentShape);
    this.applyElevation(this.currentElevation);
    this.applyDirection('ltr');
    this.renderThemeSelectors();
    this.renderFontSelectors();
    this.injectTokenWorkbench();
    this.setupListeners();
  }

  applyTheme(themeId, mode) {
    if (!THEMES[themeId]) themeId = 'academic-navy';
    this.currentTheme = themeId;
    this.currentMode = mode;

    document.documentElement.setAttribute('data-theme', themeId);
    document.documentElement.setAttribute('data-mode', mode);

    localStorage.setItem('boardify_theme', themeId);
    localStorage.setItem('boardify_mode', mode);

    this.updateLogos();
    this.updateUIState();
  }

  applyFont(fontId) {
    if (!FONT_PAIRINGS[fontId]) fontId = 'jakarta-serif';
    this.currentFont = fontId;

    document.documentElement.setAttribute('data-font', fontId);
    localStorage.setItem('boardify_font', fontId);

    document.querySelectorAll('.font-select-input').forEach(select => {
      select.value = this.currentFont;
    });

    document.querySelectorAll('.font-compare-card').forEach(card => {
      if (card.getAttribute('data-font-id') === this.currentFont) {
        card.classList.add('active');
        const btn = card.querySelector('.font-apply-btn');
        if (btn) { btn.textContent = 'Active'; btn.classList.replace('btn-secondary', 'btn-primary'); }
      } else {
        card.classList.remove('active');
        const btn = card.querySelector('.font-apply-btn');
        if (btn) { btn.textContent = 'Apply Font'; btn.classList.replace('btn-primary', 'btn-secondary'); }
      }
    });
  }

  applyShape(shapeId) {
    if (!SHAPES[shapeId]) shapeId = 'native';
    this.currentShape = shapeId;
    document.documentElement.setAttribute('data-shape', shapeId);
    localStorage.setItem('boardify_shape', shapeId);
    this.updateWorkbenchInputs();
  }

  applyElevation(elevationId) {
    if (!ELEVATIONS[elevationId]) elevationId = 'layered';
    this.currentElevation = elevationId;
    document.documentElement.setAttribute('data-elevation', elevationId);
    localStorage.setItem('boardify_elevation', elevationId);
    this.updateWorkbenchInputs();
  }

  applyDirection(dir) {
    this.currentDirection = 'ltr';
    document.documentElement.setAttribute('dir', 'ltr');
    localStorage.setItem('boardify_direction', 'ltr');
  }

  toggleMode() {
    const newMode = this.currentMode === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme, newMode);
  }

  setTheme(themeId) {
    this.applyTheme(themeId, this.currentMode);
  }

  setFont(fontId) {
    this.applyFont(fontId);
  }

  setShape(shapeId) {
    this.applyShape(shapeId);
  }

  setElevation(elevationId) {
    this.applyElevation(elevationId);
  }

  /* AI Generative Palette Synthesizer */
  generateAiPalette(seedPrompt) {
    let hex = '#0A1F44';
    const clean = (seedPrompt || '').toLowerCase();

    if (clean.includes('cardio') || clean.includes('heart') || clean.includes('pulse')) hex = '#BE123C';
    else if (clean.includes('neuro') || clean.includes('brain') || clean.includes('cortex')) hex = '#4338CA';
    else if (clean.includes('peds') || clean.includes('child') || clean.includes('neonatal')) hex = '#0284C7';
    else if (clean.includes('surg') || clean.includes('trauma') || clean.includes('or')) hex = '#0F766E';
    else if (clean.includes('derm') || clean.includes('skin')) hex = '#C2410C';
    else if (clean.includes('endo') || clean.includes('hormone')) hex = '#9333EA';
    else if (clean.includes('onco') || clean.includes('cell')) hex = '#4C1D95';
    else if (clean.includes('pulm') || clean.includes('lung')) hex = '#0891B2';
    else if (clean.startsWith('#') && clean.length >= 4) hex = seedPrompt;

    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--primary-hover', hex);
    document.documentElement.style.setProperty('--border-focus', hex);

    const banner = document.getElementById('ai-palette-active-banner');
    if (banner) {
      banner.style.display = 'block';
      banner.textContent = `⚡ AI Synthesized Specialty Token: ${hex.toUpperCase()}`;
    }
  }

  /* WCAG AAA/AA Relative Luminance Formula */
  calculateContrast(hex1, hex2) {
    const lum = (h) => {
      const rgb = parseInt(h.replace('#', ''), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    try {
      const l1 = lum(hex1);
      const l2 = lum(hex2);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return Math.round(ratio * 100) / 100;
    } catch {
      return 7.2;
    }
  }

  /* Token Exporters */
  exportTokens(format = 'json') {
    const theme = THEMES[this.currentTheme] || THEMES['academic-navy'];
    const font = FONT_PAIRINGS[this.currentFont] || FONT_PAIRINGS['jakarta-serif'];
    const shape = SHAPES[this.currentShape] || SHAPES['native'];

    if (format === 'json') {
      return JSON.stringify({
        $schema: "https://boardify.med/schema/tokens.json",
        theme: {
          id: this.currentTheme,
          name: theme.name,
          mode: this.currentMode,
          primaryColor: this.currentMode === 'light' ? theme.accentColor : theme.darkPrimary,
          wcagRating: theme.wcag
        },
        typography: {
          id: this.currentFont,
          name: font.name,
          script: "English (Latin)",
          direction: "ltr"
        },
        geometry: {
          shapePreset: shape.name,
          borderRadius: shape.radius,
          elevation: this.currentElevation
        }
      }, null, 2);
    }

    if (format === 'css') {
      return `:root[data-theme="${this.currentTheme}"][data-mode="${this.currentMode}"] {
  --primary: ${this.currentMode === 'light' ? theme.accentColor : theme.darkPrimary};
  --radius-md: ${shape.radius};
  --elevation-preset: ${this.currentElevation};
  --font-family: "${font.name}";
  --direction: ltr;
}`;
    }

    if (format === 'tailwind') {
      return `// tailwind.config.ts - Exported from Boardify Design Workbench
import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        primary: '${this.currentMode === 'light' ? theme.accentColor : theme.darkPrimary}',
      },
      borderRadius: {
        theme: '${shape.radius}',
      }
    }
  }
} satisfies Config;`;
    }
  }

  updateLogos() {
    const isDark = this.currentMode === 'dark';
    const themeObj = THEMES[this.currentTheme] || THEMES['academic-navy'];

    const svg = themeObj.getLogoSvg(isDark);
    document.querySelectorAll('.brand-logo-icon, .sidebar-brand-icon, .dynamic-theme-logo').forEach(el => {
      el.innerHTML = svg;
    });
  }

  updateUIState() {
    document.querySelectorAll('.theme-select-input').forEach(select => {
      select.value = this.currentTheme;
    });

    document.querySelectorAll('.theme-swatch-btn').forEach(btn => {
      const theme = btn.getAttribute('data-theme-id');
      btn.classList.toggle('active', theme === this.currentTheme);
    });

    document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
      btn.innerHTML = this.currentMode === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      btn.setAttribute('title', `Switch to ${this.currentMode === 'dark' ? 'Light' : 'Dark'} Mode`);
    });

    this.updateWorkbenchInputs();
  }

  updateWorkbenchInputs() {
    const shapeSelect = document.getElementById('workbench-shape-select');
    if (shapeSelect) shapeSelect.value = this.currentShape;

    const elevSelect = document.getElementById('workbench-elev-select');
    if (elevSelect) elevSelect.value = this.currentElevation;

    const themeSelect = document.getElementById('workbench-theme-select');
    if (themeSelect) themeSelect.value = this.currentTheme;

    const fontSelect = document.getElementById('workbench-font-select');
    if (fontSelect) fontSelect.value = this.currentFont;
  }

  renderThemeSelectors() {
    document.querySelectorAll('.theme-select-input').forEach(select => {
      select.innerHTML = Object.values(THEMES).map(t => 
        `<option value="${t.id}">${t.name} (${t.wcag})</option>`
      ).join('');
      select.value = this.currentTheme;
    });

    const showcaseContainer = document.getElementById('theme-swatch-list-container');
    if (showcaseContainer) {
      showcaseContainer.innerHTML = Object.values(THEMES).map(t => `
        <button class="theme-swatch-btn ${t.id === this.currentTheme ? 'active' : ''}" data-theme-id="${t.id}" title="${t.description}">
          <span class="swatch-circle" style="background: ${t.accentColor};"></span>
          <span>${t.name}</span>
        </button>
      `).join('');
    }
  }

  renderFontSelectors() {
    document.querySelectorAll('.font-select-input').forEach(select => {
      select.innerHTML = Object.values(FONT_PAIRINGS).map(f => 
        `<option value="${f.id}">${f.name}</option>`
      ).join('');
      select.value = this.currentFont;
    });

    const fontGrid = document.getElementById('font-compare-grid');
    if (fontGrid) {
      fontGrid.innerHTML = Object.values(FONT_PAIRINGS).map(f => `
        <div class="font-compare-card ${f.id === this.currentFont ? 'active' : ''}" data-font-id="${f.id}" onclick="window.themeEngine.setFont('${f.id}')">
          <div class="font-card-header">
            <div>
              <span class="badge badge-primary">${f.tag}</span>
              <h4 style="font-size: 1.05rem; font-weight: 700; margin-top: 6px; color: var(--text);">${f.name}</h4>
            </div>
            <button class="btn btn-sm ${f.id === this.currentFont ? 'btn-primary' : 'btn-secondary'} font-apply-btn">
              ${f.id === this.currentFont ? 'Active' : 'Apply Font'}
            </button>
          </div>
          <p style="font-size: 0.85rem; color: var(--muted); margin: 8px 0 12px;">${f.description}</p>
          <div class="font-preview-snippet" style="background: var(--surface2); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--text); margin-bottom: 4px;">
              62yo M with acute tearing chest pain radiating to back...
            </div>
            <div style="font-family: var(--font-serif); font-size: 0.88rem; color: var(--muted);">
              Stanford Type A Aortic Dissection • Immediate IV Esmolol & Urgent Surgical Consultation
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  /* Floating Design Token Workbench Widget */
  injectTokenWorkbench() {
    if (document.getElementById('boardify-token-workbench')) return;

    const workbench = document.createElement('div');
    workbench.id = 'boardify-token-workbench';
    workbench.className = 'token-workbench-floating';
    workbench.innerHTML = `
      <div class="workbench-toggle-handle" id="workbench-toggle-handle" title="Open Design Token Workbench">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <span>Token Workbench</span>
      </div>
      <div class="workbench-panel" id="workbench-panel">
        <div class="workbench-header">
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary); letter-spacing: 0.05em;">Design System Engine</div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text); margin: 2px 0;">Token & Theme Workbench</h3>
          </div>
          <button class="workbench-close-btn" id="workbench-close-btn" aria-label="Close Workbench">✕</button>
        </div>

        <div id="ai-palette-active-banner" style="display: none; background: var(--primary-subtle); color: var(--primary); padding: 6px 10px; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: 700; margin-bottom: 12px;"></div>

        <div class="workbench-body">
          <!-- Section 1: Clinical Palette -->
          <div class="workbench-group">
            <label class="workbench-label">Clinical Palette (11+ Presets)</label>
            <select class="workbench-select" id="workbench-theme-select">
              ${Object.values(THEMES).map(t => `<option value="${t.id}">${t.name} (${t.wcag})</option>`).join('')}
            </select>
          </div>

          <!-- Section 2: AI Generative Specialty Synthesizer -->
          <div class="workbench-group">
            <label class="workbench-label">AI Specialty Theme Synthesizer</label>
            <div style="display: flex; gap: 6px;">
              <input type="text" id="workbench-ai-prompt" class="workbench-input" placeholder="e.g. Cardiology, Neurology, #0F766E" />
              <button class="btn btn-sm btn-primary" id="workbench-ai-generate-btn">Synthesize</button>
            </div>
          </div>

          <!-- Section 3: Clinical Typography -->
          <div class="workbench-group">
            <label class="workbench-label">Clinical Typography Engine</label>
            <select class="workbench-select" id="workbench-font-select">
              ${Object.values(FONT_PAIRINGS).map(f => `<option value="${f.id}">${f.name}</option>`).join('')}
            </select>
          </div>

          <!-- Section 4: Parametric Shape Geometry -->
          <div class="workbench-group">
            <label class="workbench-label">Parametric Shape Geometry</label>
            <select class="workbench-select" id="workbench-shape-select">
              ${Object.values(SHAPES).map(s => `<option value="${s.id}">${s.name} — ${s.desc}</option>`).join('')}
            </select>
          </div>

          <!-- Section 5: Micro-Elevation Density -->
          <div class="workbench-group">
            <label class="workbench-label">Micro-Elevation & Shadow Layers</label>
            <select class="workbench-select" id="workbench-elev-select">
              ${Object.values(ELEVATIONS).map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
            </select>
          </div>

          <!-- Section 6: Export Tokens -->
          <div class="workbench-group" style="margin-top: 16px; border-top: 1px solid var(--border); padding-top: 12px;">
            <label class="workbench-label">Export Live Design Tokens</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
              <button class="btn btn-sm btn-secondary" onclick="window.themeEngine.showExportModal('json')">JSON</button>
              <button class="btn btn-sm btn-secondary" onclick="window.themeEngine.showExportModal('css')">CSS</button>
              <button class="btn btn-sm btn-secondary" onclick="window.themeEngine.showExportModal('tailwind')">Tailwind</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Modal Backdrop -->
      <div class="workbench-modal-backdrop" id="workbench-export-modal" style="display: none;">
        <div class="workbench-modal-dialog">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-weight: 800; margin: 0; color: var(--text);" id="workbench-export-title">Export Tokens</h4>
            <button class="btn btn-sm btn-secondary" onclick="document.getElementById('workbench-export-modal').style.display='none'">✕</button>
          </div>
          <textarea id="workbench-export-code" class="workbench-textarea" readonly></textarea>
          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px;">
            <button class="btn btn-secondary" onclick="document.getElementById('workbench-export-modal').style.display='none'">Close</button>
            <button class="btn btn-primary" id="workbench-copy-code-btn">Copy to Clipboard</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(workbench);
  }

  showExportModal(format) {
    const modal = document.getElementById('workbench-export-modal');
    const title = document.getElementById('workbench-export-title');
    const codeArea = document.getElementById('workbench-export-code');
    const copyBtn = document.getElementById('workbench-copy-code-btn');

    if (!modal || !codeArea) return;

    const content = this.exportTokens(format);
    title.textContent = `Exported Design Tokens (${format.toUpperCase()})`;
    codeArea.value = content;
    modal.style.display = 'flex';

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(content).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy to Clipboard'; }, 2000);
      });
    };
  }

  setupListeners() {
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('theme-select-input') || e.target.id === 'workbench-theme-select') {
        this.setTheme(e.target.value);
      }
      if (e.target.classList.contains('font-select-input') || e.target.id === 'workbench-font-select') {
        this.setFont(e.target.value);
      }
      if (e.target.id === 'workbench-shape-select') {
        this.setShape(e.target.value);
      }
      if (e.target.id === 'workbench-elev-select') {
        this.setElevation(e.target.value);
      }
    });

    document.addEventListener('click', (e) => {
      const swatchBtn = e.target.closest('.theme-swatch-btn');
      if (swatchBtn) {
        const themeId = swatchBtn.getAttribute('data-theme-id');
        if (themeId) this.setTheme(themeId);
      }

      const fontCard = e.target.closest('.font-compare-card');
      if (fontCard) {
        const fontId = fontCard.getAttribute('data-font-id');
        if (fontId) this.setFont(fontId);
      }

      const modeBtn = e.target.closest('.mode-toggle-btn');
      if (modeBtn) {
        this.toggleMode();
      }

      // Workbench UI toggles
      if (e.target.closest('#workbench-toggle-handle')) {
        const panel = document.getElementById('workbench-panel');
        if (panel) panel.classList.toggle('open');
      }

      if (e.target.closest('#workbench-close-btn')) {
        const panel = document.getElementById('workbench-panel');
        if (panel) panel.classList.remove('open');
      }

      if (e.target.id === 'workbench-ai-generate-btn') {
        const promptInput = document.getElementById('workbench-ai-prompt');
        if (promptInput && promptInput.value.trim()) {
          this.generateAiPalette(promptInput.value.trim());
        }
      }
    });
  }
}

// Instantiate globally
window.themeEngine = new ThemeEngine();
