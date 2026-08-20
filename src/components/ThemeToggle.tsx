'use client';

import { useSyncExternalStore } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { Dictionary } from '@/i18n';

type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';

// `localStorage` est un état EXTÉRIEUR à React : le lire dans un effet pour le
// recopier dans un `useState` marche, mais duplique la source de vérité et se
// désynchronise entre deux onglets. `useSyncExternalStore` le lit là où il est.
//
// C'est aussi ce qui rend l'hydratation correcte sans bricolage : React se sert
// de l'instantané SERVEUR pour le premier rendu — « système », comme le HTML
// livré — puis rebascule sur la valeur réelle. Un `useState` initialisé depuis
// localStorage produirait, lui, un premier rendu client différent du HTML.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);
    // L'événement `storage` ne se déclenche QUE dans les autres onglets : d'où
    // la liste d'abonnés, qui couvre l'onglet courant.
    window.addEventListener('storage', listener);
    return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', listener);
    };
}

function getSnapshot(): Theme {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch {
        // Stockage indisponible (navigation privée, cookies bloqués) :
        // « système » reste un défaut valable.
        return 'system';
    }
}

function getServerSnapshot(): Theme {
    return 'system';
}

function applyTheme(next: Theme) {
    try {
        if (next === 'system') localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, next);
    } catch {
        // Le thème s'applique quand même, il ne survivra pas au rechargement.
    }

    if (next === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', next);

    for (const listener of listeners) listener();
}

export function ThemeToggle({ dictionary }: { dictionary: Dictionary }) {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
        { value: 'system', label: dictionary.header.themeSystem, Icon: Monitor },
        { value: 'light', label: dictionary.header.themeLight, Icon: Sun },
        { value: 'dark', label: dictionary.header.themeDark, Icon: Moon },
    ];

    return (
        <div
            role="group"
            aria-label={dictionary.header.themeLabel}
            className="flex items-center gap-0.5 rounded-full bg-bg-sunken p-0.5"
        >
            {options.map(({ value, label, Icon }) => {
                const active = theme === value;
                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => applyTheme(value)}
                        aria-pressed={active}
                        title={label}
                        className={`flex size-8 items-center justify-center rounded-full transition-colors ${
                            active
                                ? 'bg-accent text-accent-contrast'
                                : 'text-fg-muted hover:bg-bg-sunken hover:text-fg'
                        }`}
                    >
                        <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
                        <span className="sr-only">{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
