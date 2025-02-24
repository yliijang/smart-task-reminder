import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ThemeColor = string;
type GradientType = 'gradient-1' | 'gradient-2' | 'gradient-3' | 'gradient-4' | 'gradient-5';

interface ThemeContextType {
  theme: Theme;
  primaryColor: ThemeColor;
  secondaryColor: ThemeColor;
  backgroundGradient: GradientType;
  toggleTheme: () => void;
  updateColors: (primary: ThemeColor, secondary: ThemeColor) => void;
  updateGradient: (gradient: GradientType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });
  
  const [primaryColor, setPrimaryColor] = useState<ThemeColor>('#007AFF');
  const [secondaryColor, setSecondaryColor] = useState<ThemeColor>('#5856D6');
  const [backgroundGradient, setBackgroundGradient] = useState<GradientType>('gradient-1');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateColors = (primary: ThemeColor, secondary: ThemeColor) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
  };

  const updateGradient = (gradient: GradientType) => {
    setBackgroundGradient(gradient);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        primaryColor,
        secondaryColor,
        backgroundGradient,
        toggleTheme,
        updateColors,
        updateGradient,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 