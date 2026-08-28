import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './js/**/*.{js,ts,jsx,tsx}',
    './css/**/*.css'
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          light: 'var(--primary-light)',
          subtle: 'var(--primary-subtle)',
          foreground: 'var(--onPrimary)'
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface2)',
          3: 'var(--surface3)'
        },
        background: 'var(--bg)',
        border: {
          DEFAULT: 'var(--border)',
          focus: 'var(--border-focus)'
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--muted)',
          subtle: 'var(--subtle-text)'
        },
        clinical: {
          success: {
            DEFAULT: 'var(--success)',
            bg: 'var(--success-bg)',
            border: 'var(--success-border)',
            foreground: 'var(--onSuccess)'
          },
          error: {
            DEFAULT: 'var(--error)',
            bg: 'var(--error-bg)',
            border: 'var(--error-border)',
            foreground: 'var(--onError)'
          },
          flag: {
            DEFAULT: 'var(--flag)',
            bg: 'var(--flag-bg)',
            border: 'var(--flag-border)'
          },
          info: {
            DEFAULT: 'var(--info)',
            bg: 'var(--info-bg)',
            border: 'var(--info-border)'
          },
          distractor: {
            bg: 'var(--distractor-bg)',
            border: 'var(--distractor-border)',
            struck: 'var(--distractor-struck)'
          }
        },
        highlight: {
          yellow: 'var(--highlight-yellow)',
          cyan: 'var(--highlight-cyan)',
          emerald: 'var(--highlight-emerald)'
        }
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
        arabic: 'var(--font-arabic)',
        arabicSerif: 'var(--font-arabic-serif)'
      },
      fontSize: {
        '2xs': 'var(--text-2xs)',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)'
      },
      borderRadius: {
        sharp: 'var(--radius-sharp)',
        subtle: 'var(--radius-subtle)',
        native: 'var(--radius-native)',
        modern: 'var(--radius-modern)',
        organic: 'var(--radius-organic)',
        pill: 'var(--radius-pill)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      },
      boxShadow: {
        'elevation-0': 'var(--elevation-0)',
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-3': 'var(--elevation-3)',
        'elevation-4': 'var(--elevation-4)',
        card: 'var(--card-shadow)'
      },
      transitionTimingFunction: {
        'spring-clinical': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      lineHeight: {
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)'
      }
    }
  },
  plugins: []
};

export default config;
