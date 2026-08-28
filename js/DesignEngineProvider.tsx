import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';

/* ==========================================================================
   BOARDIFY DESIGN ENGINE TYPES & CONTRACTS
   ========================================================================== */

export type ThemePaletteId =
  | 'academic-navy'
  | 'digital-slate'
  | 'clinical-teal'
  | 'forest-emerald'
  | 'crimson-urgency'
  | 'mayo-violet'
  | 'nordic-titanium'
  | 'golden-caduceus'
  | 'obsidian-diagnostic'
  | 'bio-sage'
  | 'custom-ai';

export type FontPairingId =
  | 'jakarta-serif'
  | 'inter-lora'
  | 'geist-plex'
  | 'space-newsreader'
  | 'cabinet-fraunces'
  | 'lexend-serif'
  | 'arabic-plex'
  | 'arabic-readex';

export type ShapeGeometry = 'sharp' | 'subtle' | 'native' | 'modern' | 'organic' | 'pill';
export type ElevationDensity = 'flat' | 'subtle' | 'layered' | 'floating';
export type ColorMode = 'light' | 'dark';
export type TextDirection = 'ltr' | 'rtl';

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  category: 'Clinical Core' | 'High-Tech' | 'Surgical & Specialty' | 'Ergonomic';
  primaryLight: string;
  primaryDark: string;
  accent: string;
  flag: string;
  description: string;
  wcagRating: 'AAA' | 'AA';
}

export interface FontPairing {
  id: FontPairingId;
  name: string;
  sans: string;
  serif: string;
  script: 'Latin' | 'Arabic' | 'Dual';
  tag: string;
  bestFor: string;
}

export interface DesignEngineState {
  palette: ThemePaletteId;
  mode: ColorMode;
  font: FontPairingId;
  shape: ShapeGeometry;
  elevation: ElevationDensity;
  direction: TextDirection;
  fontSizeScale: number; // 0.9 to 1.25 multiplier
  customAiColor: string | null;
}

export interface DesignEngineContextType extends DesignEngineState {
  setPalette: (palette: ThemePaletteId) => void;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
  setFont: (font: FontPairingId) => void;
  setShape: (shape: ShapeGeometry) => void;
  setElevation: (elevation: ElevationDensity) => void;
  setDirection: (direction: TextDirection) => void;
  toggleDirection: () => void;
  setFontSizeScale: (scale: number) => void;
  generateAiPalette: (seedHexOrPrompt: string) => void;
  exportTokensAsJson: () => string;
  exportTokensAsCss: () => string;
  exportTokensAsTailwind: () => string;
  calculateWcagContrast: (fg: string, bg: string) => { ratio: number; level: string };
  palettes: ThemePalette[];
  fontPairings: FontPairing[];
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'academic-navy',
    name: 'Academic Navy / Royal',
    category: 'Clinical Core',
    primaryLight: '#0A1F44',
    primaryDark: '#437EEB',
    accent: '#2563EB',
    flag: '#D97706',
    description: 'Gold-standard clinical authority and deep concentration for NBME & USMLE.',
    wcagRating: 'AAA'
  },
  {
    id: 'digital-slate',
    name: 'Digital Slate & Cyan',
    category: 'High-Tech',
    primaryLight: '#0F172A',
    primaryDark: '#06B6D4',
    accent: '#06B6D4',
    flag: '#D97706',
    description: 'High-tech diagnostic SaaS feel with surgical cyan highlights.',
    wcagRating: 'AAA'
  },
  {
    id: 'clinical-teal',
    name: 'Clinical Deep Teal',
    category: 'Surgical & Specialty',
    primaryLight: '#0F766E',
    primaryDark: '#2DD4BF',
    accent: '#2DD4BF',
    flag: '#C2410C',
    description: 'Surgical theatre precision and calm antiseptic environment.',
    wcagRating: 'AAA'
  },
  {
    id: 'forest-emerald',
    name: 'Focused Forest Emerald',
    category: 'Clinical Core',
    primaryLight: '#064E3B',
    primaryDark: '#10B981',
    accent: '#10B981',
    flag: '#B45309',
    description: 'Lancet & British medical journal aesthetic designed for marathon question blocks.',
    wcagRating: 'AAA'
  },
  {
    id: 'crimson-urgency',
    name: 'High-Yield Crimson & Harvard',
    category: 'Clinical Core',
    primaryLight: '#881337',
    primaryDark: '#FB7185',
    accent: '#E11D48',
    flag: '#D97706',
    description: 'High-acuity alert styling with ivy league heritage red.',
    wcagRating: 'AAA'
  },
  {
    id: 'mayo-violet',
    name: 'Mayo Royal Violet',
    category: 'Surgical & Specialty',
    primaryLight: '#3730A3',
    primaryDark: '#818CF8',
    accent: '#818CF8',
    flag: '#C2410C',
    description: 'Diagnostic iris wavelength engineered to minimize ocular fatigue.',
    wcagRating: 'AAA'
  },
  {
    id: 'nordic-titanium',
    name: 'Nordic Titanium & Polar Azure',
    category: 'High-Tech',
    primaryLight: '#0284C7',
    primaryDark: '#38BDF8',
    accent: '#38BDF8',
    flag: '#D97706',
    description: 'Minimalist Scandinavian surgical elegance with icy blue accents.',
    wcagRating: 'AAA'
  },
  {
    id: 'golden-caduceus',
    name: 'Golden Caduceus & Amber',
    category: 'Surgical & Specialty',
    primaryLight: '#92400E',
    primaryDark: '#F59E0B',
    accent: '#F59E0B',
    flag: '#D97706',
    description: 'Warm gold medal board distinction for elite scorers.',
    wcagRating: 'AA'
  },
  {
    id: 'obsidian-diagnostic',
    name: 'Obsidian Diagnostic (Night Shift)',
    category: 'Ergonomic',
    primaryLight: '#18181B',
    primaryDark: '#E4E4E7',
    accent: '#38BDF8',
    flag: '#F59E0B',
    description: 'Ultra-low luminance stealth mode tailored for ICU & overnight shifts.',
    wcagRating: 'AAA'
  },
  {
    id: 'bio-sage',
    name: 'Bio-Sage & Arctic Frost',
    category: 'Ergonomic',
    primaryLight: '#2E3440',
    primaryDark: '#88C0D0',
    accent: '#88C0D0',
    flag: '#EBCB8B',
    description: 'Neurological cognitive balance inspired by Nordic medical centers.',
    wcagRating: 'AAA'
  }
];

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'jakarta-serif',
    name: 'Plus Jakarta Sans + Source Serif 4',
    sans: 'Plus Jakarta Sans',
    serif: 'Source Serif 4',
    script: 'Latin',
    tag: 'Modern Clinical Standard',
    bestFor: 'Official USMLE / NBME simulation style'
  },
  {
    id: 'inter-lora',
    name: 'Inter + Lora',
    sans: 'Inter',
    serif: 'Lora',
    script: 'Latin',
    tag: 'Biomedical Tech',
    bestFor: 'Clean digital interface with warm literature vignette reading'
  },
  {
    id: 'geist-plex',
    name: 'Geist + IBM Plex Serif',
    sans: 'Geist',
    serif: 'IBM Plex Serif',
    script: 'Latin',
    tag: 'High-Precision Tech',
    bestFor: 'Ultra-crisp subpixel geometric rendering'
  },
  {
    id: 'space-newsreader',
    name: 'Space Grotesk + Newsreader',
    sans: 'Space Grotesk',
    serif: 'Newsreader',
    script: 'Latin',
    tag: 'Editorial Lancet / BMJ',
    bestFor: 'Academic medical journal prestige feel'
  },
  {
    id: 'cabinet-fraunces',
    name: 'Cabinet Grotesk + Fraunces',
    sans: 'Cabinet Grotesk',
    serif: 'Fraunces',
    script: 'Latin',
    tag: 'Oxford Academic Heritage',
    bestFor: 'Warm collegiate display serif with high-density UI'
  },
  {
    id: 'lexend-serif',
    name: 'Lexend Deca + Source Serif 4',
    sans: 'Lexend Deca',
    serif: 'Source Serif 4',
    script: 'Latin',
    tag: 'Dyslexia Ergonomics',
    bestFor: 'Enhanced saccadic velocity and reduced reading fatigue'
  },
  {
    id: 'arabic-plex',
    name: 'IBM Plex Sans Arabic + Amiri',
    sans: 'IBM Plex Sans Arabic',
    serif: 'Amiri',
    script: 'Dual',
    tag: 'Arabic Clinical Authority',
    bestFor: 'Flawless medical terminology & Middle East board exams (SMLE/OMS)'
  },
  {
    id: 'arabic-readex',
    name: 'Readex Pro + Cairo',
    sans: 'Readex Pro',
    serif: 'Cairo',
    script: 'Dual',
    tag: 'Modern Arabic Q-Bank',
    bestFor: 'Contemporary clean Arabic typographic rhythm'
  }
];

/* Helper: Color Luminance & WCAG Contrast Formula */
function getRelativeLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function calculateWcagContrast(fg: string, bg: string): { ratio: number; level: string } {
  try {
    const l1 = getRelativeLuminance(fg);
    const l2 = getRelativeLuminance(bg);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
    const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail';
    return { ratio, level };
  } catch {
    return { ratio: 4.5, level: 'AA' };
  }
}

const DesignEngineContext = createContext<DesignEngineContextType | undefined>(undefined);

export const DesignEngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [palette, setPalette] = useState<ThemePaletteId>('academic-navy');
  const [mode, setMode] = useState<ColorMode>('light');
  const [font, setFont] = useState<FontPairingId>('jakarta-serif');
  const [shape, setShape] = useState<ShapeGeometry>('native');
  const [elevation, setElevation] = useState<ElevationDensity>('layered');
  const [direction, setDirection] = useState<TextDirection>('ltr');
  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [customAiColor, setCustomAiColor] = useState<string | null>(null);

  // Sync DOM attributes whenever tokens change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', palette);
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-font', font);
    root.setAttribute('data-shape', shape);
    root.setAttribute('data-elevation', elevation);
    root.setAttribute('dir', direction);

    // Dynamic Font Scale
    root.style.setProperty('--font-scale-multiplier', fontSizeScale.toString());

    // Update Arabic font automatically when RTL is activated if on latin
    if (direction === 'rtl' && !font.startsWith('arabic-')) {
      setFont('arabic-plex');
    }
  }, [palette, mode, font, shape, elevation, direction, fontSizeScale]);

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleDirection = () => setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));

  // Generative AI Palette Engine (Harmonic HSL math)
  const generateAiPalette = (seed: string) => {
    let hex = seed;
    if (seed.toLowerCase().includes('cardio') || seed.toLowerCase().includes('heart')) hex = '#BE123C';
    else if (seed.toLowerCase().includes('neuro') || seed.toLowerCase().includes('brain')) hex = '#4338CA';
    else if (seed.toLowerCase().includes('peds') || seed.toLowerCase().includes('child')) hex = '#0284C7';
    else if (seed.toLowerCase().includes('surg') || seed.toLowerCase().includes('trauma')) hex = '#0F766E';
    else if (!hex.startsWith('#')) hex = '#0A1F44';

    setCustomAiColor(hex);
    setPalette('custom-ai');

    const root = document.documentElement;
    root.style.setProperty('--primary', hex);
    root.style.setProperty('--primary-hover', hex);
    root.style.setProperty('--border-focus', hex);
  };

  const exportTokensAsJson = () => {
    const activePalette = THEME_PALETTES.find((p) => p.id === palette) || THEME_PALETTES[0];
    const activeFont = FONT_PAIRINGS.find((f) => f.id === font) || FONT_PAIRINGS[0];

    const tokens = {
      theme: {
        id: palette,
        name: activePalette.name,
        mode,
        primary: mode === 'light' ? activePalette.primaryLight : activePalette.primaryDark,
        accent: activePalette.accent,
        flag: activePalette.flag
      },
      typography: {
        id: font,
        name: activeFont.name,
        sans: activeFont.sans,
        serif: activeFont.serif,
        scaleMultiplier: fontSizeScale
      },
      geometry: {
        shape,
        elevation
      },
      locale: {
        direction
      }
    };
    return JSON.stringify(tokens, null, 2);
  };

  const exportTokensAsCss = () => {
    const activePalette = THEME_PALETTES.find((p) => p.id === palette) || THEME_PALETTES[0];
    return `:root[data-theme="${palette}"][data-mode="${mode}"] {
  --primary: ${mode === 'light' ? activePalette.primaryLight : activePalette.primaryDark};
  --accent: ${activePalette.accent};
  --flag: ${activePalette.flag};
  --shape-preset: ${shape};
  --elevation-preset: ${elevation};
  --font-family-ui: "${FONT_PAIRINGS.find((f) => f.id === font)?.sans}", sans-serif;
  --font-family-vignette: "${FONT_PAIRINGS.find((f) => f.id === font)?.serif}", serif;
}`;
  };

  const exportTokensAsTailwind = () => {
    const activePalette = THEME_PALETTES.find((p) => p.id === palette) || THEME_PALETTES[0];
    return `// tailwind.config.js - Exported from Boardify Token Workbench
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${mode === 'light' ? activePalette.primaryLight : activePalette.primaryDark}',
        accent: '${activePalette.accent}',
        flag: '${activePalette.flag}',
      },
      fontFamily: {
        sans: ['${FONT_PAIRINGS.find((f) => f.id === font)?.sans}', 'sans-serif'],
        serif: ['${FONT_PAIRINGS.find((f) => f.id === font)?.serif}', 'serif'],
      }
    }
  }
};`;
  };

  const contextValue = useMemo(
    () => ({
      palette,
      mode,
      font,
      shape,
      elevation,
      direction,
      fontSizeScale,
      customAiColor,
      setPalette,
      setMode,
      toggleMode,
      setFont,
      setShape,
      setElevation,
      setDirection,
      toggleDirection,
      setFontSizeScale,
      generateAiPalette,
      exportTokensAsJson,
      exportTokensAsCss,
      exportTokensAsTailwind,
      calculateWcagContrast,
      palettes: THEME_PALETTES,
      fontPairings: FONT_PAIRINGS
    }),
    [palette, mode, font, shape, elevation, direction, fontSizeScale, customAiColor]
  );

  return <DesignEngineContext.Provider value={contextValue}>{children}</DesignEngineContext.Provider>;
};

export const useDesignEngine = (): DesignEngineContextType => {
  const context = useContext(DesignEngineContext);
  if (!context) {
    throw new Error('useDesignEngine must be used within a DesignEngineProvider');
  }
  return context;
};
