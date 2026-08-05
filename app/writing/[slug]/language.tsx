'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const STORAGE_KEY = 'writing-lang';

interface LanguageContextValue {
    lang: string;
    setLang: (lang: string) => void;
    available: string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LANG_LABELS: Record<string, string> = {
    en: 'EN',
    th: 'ไทย',
};

export function LanguageProvider({
    available,
    children,
}: {
    available: string[];
    children: ReactNode;
}) {
    // Default to the first declared language until we can read the stored preference.
    const [lang, setLang] = useState(available[0]);

    // On mount, adopt the remembered choice if this post has it.
    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && available.includes(stored)) {
            setLang(stored);
        }
    }, [available]);

    const choose = (next: string) => {
        setLang(next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang: choose, available }}>
            {children}
        </LanguageContext.Provider>
    );
}

function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return ctx;
}

// Wraps one language's markdown body. Both blocks render into the HTML; the
// inactive one is hidden so switching is instant with no re-render.
export function Lang({ code, children }: { code: string; children: ReactNode }) {
    const { lang } = useLanguage();
    const active = code === lang;
    return (
        <div hidden={!active} className={code === 'th' ? 'thai' : undefined}>
            {children}
        </div>
    );
}

// The EN / ไทย switch. Renders nothing for single-language posts.
export function LanguageToggle() {
    const { lang, setLang, available } = useLanguage();
    if (available.length < 2) return null;
    return (
        <div className="buttons has-addons mt-2">
            {available.map((code) => (
                <button
                    key={code}
                    type="button"
                    className={`button is-small ${lang === code ? 'is-dark is-selected' : ''} ${code === 'th' ? 'thai' : ''}`}
                    onClick={() => setLang(code)}
                >
                    {LANG_LABELS[code] ?? code.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

// Renders the title in the active language, falling back to the primary title.
export function LocalizedTitle({ titles }: { titles: Record<string, string> }) {
    const { lang } = useLanguage();
    const text = titles[lang] ?? titles[Object.keys(titles)[0]];
    return <div className={`is-size-2 ${lang === 'th' ? 'thai' : ''}`}>{text}</div>;
}
