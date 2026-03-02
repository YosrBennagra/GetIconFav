import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

function getSystemTheme(): 'dark' | 'light' {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem('theme') as Theme | null;
        return stored === 'light' || stored === 'dark' ? stored : 'system';
    });

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t);
        if (t === 'system') {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', t);
        }
        applyTheme(t);
    }, []);

    // Listen for system preference changes
    useEffect(() => {
        if (theme !== 'system') return;
        const mq = window.matchMedia('(prefers-color-scheme: light)');
        const handler = () => applyTheme('system');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [theme]);

    // Apply on mount
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const resolvedTheme: 'dark' | 'light' = theme === 'system' ? getSystemTheme() : theme;

    return { theme, resolvedTheme, setTheme } as const;
}
