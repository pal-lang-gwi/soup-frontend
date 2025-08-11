// Modern Design System for SOUP
const modernTheme = {
  // Color Palette - Modern & Professional
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f0f8ff',
      100: '#e0f0ff',
      200: '#bae2ff',
      300: '#7cceff',
      400: '#36b6ff',
      500: '#0b9bf0', // Main brand color
      600: '#0082d1',
      700: '#0066a6',
      800: '#005489',
      900: '#004672',
    },
    
    // Secondary Colors
    secondary: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Background & Surface
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
    },
    
    // Text Colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      disabled: '#94a3b8',
      inverse: '#ffffff',
    },
    
    // Border Colors
    border: {
      light: '#e2e8f0',
      default: '#cbd5e1',
      strong: '#94a3b8',
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: [
        'Inter', 
        'Pretendard Variable', 
        'Pretendard', 
        '-apple-system', 
        'BlinkMacSystemFont',
        'system-ui',
        'Roboto',
        'Helvetica Neue',
        'Segoe UI',
        'Apple SD Gothic Neo',
        'Noto Sans KR',
        'Malgun Gothic',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'sans-serif'
      ],
      mono: ['JetBrains Mono', 'D2Coding', 'Consolas', 'Monaco', 'monospace'],
      display: [
        'Cal Sans', 
        'Pretendard Variable', 
        'Pretendard', 
        'Inter', 
        'Apple SD Gothic Neo',
        'Noto Sans KR',
        'system-ui', 
        'sans-serif'
      ],
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
    }
  },
  
  // Spacing System (4px base unit)
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
    32: '8rem',    // 128px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    default: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
  
  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation & Transitions
  transition: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: '2rem',    // 32px
        md: '2.5rem',  // 40px
        lg: '3rem',    // 48px
      },
      padding: {
        sm: '0.5rem 0.75rem',
        md: '0.625rem 1rem',
        lg: '0.75rem 1.5rem',
      }
    },
    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      }
    },
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      }
    }
  },
  
  // Layout
  layout: {
    container: {
      maxWidth: '1200px',
      padding: '0 1rem',
    },
    header: {
      height: '4rem', // 64px
    }
  }
};

// Legacy theme properties for backward compatibility
const legacyTheme = {
  // Legacy colors
  mainColor: '#0b9bf0',
  buttonColor: '#0b9bf0', 
  mainGreen: '#22c55e',
  lightGreen: '#dcfce7',
  darkGreen: '#16a34a',
  
  // Legacy status colors
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#0ea5e9',
  neutral: '#737373',
  
  // Legacy background
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    gradient: {
      primary: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)',
      secondary: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
    },
  },
  
  // Legacy text
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    tertiary: '#64748b',
    muted: '#94a3b8',
    inverse: '#ffffff',
  },
  
  // Legacy border
  border: {
    primary: '#e2e8f0',
    secondary: '#cbd5e1',
    accent: '#0b9bf0',
  },
  
  // Legacy skeleton
  skeleton: {
    primary: '#f1f5f9',
    secondary: '#e2e8f0',
  },
  
  // Legacy icon
  icon: {
    primary: '#0f172a',
    secondary: '#64748b',
    accent: '#0b9bf0',
    muted: '#94a3b8',
  },
  
  // Legacy font
  mainFont: 'Inter, Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};

// Combine modern theme with legacy properties
export const combinedTheme = {
  ...modernTheme,
  ...legacyTheme,
};

// Export as theme for backward compatibility
export const theme = combinedTheme;

// Type definitions for TypeScript
export type Theme = typeof combinedTheme;
export type ColorScale = typeof modernTheme.colors.primary;
