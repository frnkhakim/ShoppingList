import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceAlt: '#f9f9f9',
    border: '#e0e0e0',
    borderLight: '#dddddd',
    text: '#333333',
    textSecondary: '#666666',
    textMuted: '#999999',
    filterButtonBg: '#f0f0f0',
    clearDanger: '#ffcdd2',
    clearWarning: '#fff3cd',
    inputBg: '#f9f9f9',
    accent: '#2196F3',
    accentPressed: '#1976D2',
    itemBg: '#ffffff',
    itemCompletedBg: '#f9f9f9',
    modalBg: '#ffffff',
    shadow: '#000000',
};

export const darkColors = {
    background: '#121212',
    surface: '#1e1e1e',
    surfaceAlt: '#252525',
    border: '#333333',
    borderLight: '#444444',
    text: '#e0e0e0',
    textSecondary: '#aaaaaa',
    textMuted: '#666666',
    filterButtonBg: '#2a2a2a',
    clearDanger: '#4a1a1a',
    clearWarning: '#3a2e00',
    inputBg: '#2a2a2a',
    accent: '#2196F3',
    accentPressed: '#1976D2',
    itemBg: '#1e1e1e',
    itemCompletedBg: '#181818',
    modalBg: '#2a2a2a',
    shadow: '#000000',
};

export type ThemeColors = typeof lightColors;

interface ThemeContextType {
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    colors: lightColors,
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemScheme === 'dark');

    const toggleTheme = () => setIsDark(prev => !prev);
    const colors = isDark ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
