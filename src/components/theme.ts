import { ColorScheme } from '@/types';

/**
 * Theme interface defining the complete theme structure for landing pages
 */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background?: string;
    text?: string;
  };
  name: 'minimal' | 'bold';
}

/**
 * Minimal Theme - Clean, light, and professional
 * Uses a blue-purple color palette with soft accents
 */
export const minimalTheme: Theme = {
  colors: {
    primary: '#3b82f6',      // Blue
    secondary: '#8b5cf6',    // Purple
    accent: '#06b6d4',       // Cyan
    background: '#ffffff',   // White
    text: '#1f2937',         // Dark Gray
  },
  name: 'minimal',
};

/**
 * Bold Theme - High contrast, modern, and striking
 * Uses black, white, and vibrant accent colors for maximum impact
 */
export const boldTheme: Theme = {
  colors: {
    primary: '#000000',      // Black
    secondary: '#ffffff',    // White
    accent: '#ef4444',       // Red
    background: '#000000',   // Black
    text: '#ffffff',         // White
  },
  name: 'bold',
};

/**
 * Elegant Theme - Sophisticated, refined color palette
 * Uses deep colors with gold accents for a premium feel
 */
export const elegantTheme: Theme = {
  colors: {
    primary: '#1e293b',      // Deep Slate
    secondary: '#64748b',    // Slate
    accent: '#d97706',       // Amber
    background: '#ffffff',   // White
    text: '#0f172a',         // Deep Navy
  },
  name: 'minimal', // Uses minimal structure with elegant colors
};

/**
 * Converts a ColorScheme object to a Theme object
 * Maps the color values and infers the theme name based on color characteristics
 *
 * @param colors - The color scheme to convert
 * @param themeName - Optional explicit theme name ('minimal' or 'bold')
 * @returns A Theme object
 */
export function createTheme(
  colors: ColorScheme,
  themeName?: 'minimal' | 'bold'
): Theme {
  const theme: Theme = {
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.background,
      text: colors.text,
    },
    name: themeName || inferThemeName(colors),
  };

  return theme;
}

/**
 * Infers the theme name based on color characteristics
 * Analyzes color brightness to determine if it's a minimal (light) or bold (dark) theme
 *
 * @param colors - The color scheme to analyze
 * @returns 'minimal' or 'bold'
 */
function inferThemeName(colors: ColorScheme): 'minimal' | 'bold' {
  // Calculate luminance for primary color
  const primaryLuminance = getColorLuminance(colors.primary);

  // If primary color is dark (luminance < 0.5), it's a bold theme
  // Otherwise, it's a minimal theme
  return primaryLuminance < 0.5 ? 'bold' : 'minimal';
}

/**
 * Calculates relative luminance of a hex color
 * Uses the WCAG formula for determining color brightness
 *
 * @param hex - Hex color code (e.g., '#ffffff')
 * @returns Luminance value between 0 and 1
 */
function getColorLuminance(hex: string): number {
  // Remove the # character if present
  const color = hex.replace('#', '');

  // Parse hex to RGB
  const r = parseInt(color.substring(0, 2), 16) / 255;
  const g = parseInt(color.substring(2, 4), 16) / 255;
  const b = parseInt(color.substring(4, 6), 16) / 255;

  // Calculate relative luminance using WCAG formula
  const luminance =
    0.2126 * adjustChannel(r) +
    0.7152 * adjustChannel(g) +
    0.0722 * adjustChannel(b);

  return luminance;
}

/**
 * Adjusts RGB channel value for luminance calculation
 */
function adjustChannel(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Gets a theme by name
 *
 * @param name - Theme name
 * @returns Theme object
 */
export function getThemeByName(name: string): Theme {
  switch (name.toLowerCase()) {
    case 'minimal':
      return minimalTheme;
    case 'bold':
      return boldTheme;
    case 'elegant':
      return elegantTheme;
    default:
      return minimalTheme;
  }
}

/**
 * Gets all available pre-defined themes
 *
 * @returns Array of Theme objects
 */
export function getAllThemes(): Theme[] {
  return [minimalTheme, boldTheme, elegantTheme];
}
