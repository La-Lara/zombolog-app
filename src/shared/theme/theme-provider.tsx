import { createContext, PropsWithChildren, useContext } from 'react';

import { colors, radius, spacing, typography } from './tokens';

const theme = {
  colors,
  radius,
  spacing,
  typography,
};

type AppTheme = typeof theme;

const ThemeContext = createContext<AppTheme>(theme);

export function ThemeProvider({ children }: PropsWithChildren) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
