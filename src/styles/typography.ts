// Typography System for Joel & Stephanie Wedding Website
// Consistent text styles based on comprehensive site audit

export const typography = {
  // Font families
  fonts: {
    sans: 'Instrument Sans, sans-serif',
    serif: 'Cardo, serif',
  },

  // Color palette
  colors: {
    primary: '#1a1a1a',      // Main headings
    secondary: '#2c3e50',     // Sub-headings
    body: '#4a4a4a',         // Body text
    muted: '#666666',        // Muted text
    light: '#888888',        // Light text
    accent: '#FF6B6B',       // Accent/links
    error: '#ef4444',        // Error messages
    success: '#27ae60',      // Success messages
  },

  // Font weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Typography scale
  styles: {
    // Main page title (largest heading)
    title: {
      fontFamily: 'Cardo, serif',
      fontSize: 'clamp(3rem, 6vw, 4.5rem)',
      fontWeight: 400,
      color: '#1a1a1a',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },

    // Section headings
    heading: {
      fontFamily: 'Cardo, serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 600,
      color: '#2c3e50',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },

    // Subsection headings
    subheading: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
      fontWeight: 600,
      color: '#2c3e50',
      lineHeight: 1.3,
    },

    // Body text (main content)
    body: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      fontWeight: 400,
      color: '#4a4a4a',
      lineHeight: 1.6,
    },

    // Small body text
    bodySmall: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: 'clamp(0.875rem, 1.8vw, 0.95rem)',
      fontWeight: 400,
      color: '#4a4a4a',
      lineHeight: 1.5,
    },

    // Links
    link: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      fontWeight: 500,
      color: '#FF6B6B',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },

    // Navigation links
    navLink: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
      color: 'inherit',
      textDecoration: 'none',
    },

    // Button text
    button: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
      textDecoration: 'none',
    },

    // Form labels
    label: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2c3e50',
    },

    // Form inputs
    input: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: '16px', // Prevents iOS zoom
      fontWeight: 400,
      color: '#1a1a1a',
    },

    // Help text
    helpText: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: '0.85rem',
      fontWeight: 400,
      color: '#888888',
      lineHeight: 1.4,
    },

    // Caption text
    caption: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: '0.8rem',
      fontWeight: 400,
      color: '#666666',
      lineHeight: 1.4,
    },

    // Event times (schedule specific)
    eventTime: {
      fontFamily: 'Instrument Sans, sans-serif',
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: 400,
      color: '#FF6B6B',
      lineHeight: 1.1,
    },

    // Event titles (schedule specific)
    eventTitle: {
      fontFamily: 'Cardo, serif',
      fontSize: 'clamp(3rem, 6vw, 5.5rem)',
      fontWeight: 400,
      color: '#1a1a1a',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
  }
};

// Helper function to apply typography styles
export const applyTypographyStyle = (styleName: keyof typeof typography.styles) => {
  return typography.styles[styleName];
};

// CSS-in-JS helper for React components
export const getTypographyCSS = (styleName: keyof typeof typography.styles) => {
  const style = typography.styles[styleName];
  return Object.keys(style).reduce((acc, key) => {
    // Convert camelCase to kebab-case for CSS
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    acc[cssKey] = style[key as keyof typeof style];
    return acc;
  }, {} as Record<string, any>);
};