// Trois tuiles et un disque : un panneau d'objets dont un est différent, celui
// qu'on choisit. C'est ce que fait le site, et ça se reconnaît encore à 16 px —
// ce qui n'était le cas ni de l'arche (illisible, elle se lit « n ») ni d'une
// manette, qui aurait dit « jeux » comme n'importe quel autre logo.
export function BrandMark({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 64 64" className={className}>
            <rect width="64" height="64" rx="15" className="fill-accent" />
            <rect x="16" y="16" width="14" height="14" rx="4" className="fill-accent-contrast" />
            <rect x="34" y="16" width="14" height="14" rx="4" className="fill-accent-contrast" />
            <rect x="16" y="34" width="14" height="14" rx="4" className="fill-accent-contrast" />
            <circle cx="41" cy="41" r="7" className="fill-accent-contrast" />
        </svg>
    );
}

// La signature se lit en deux temps : ce que le site EST en pleine encre, le
// domaine qui le porte en retrait. Le découpage se fait sur le premier point,
// pas sur une seconde clé de dictionnaire — une clé « tête » et une clé
// « queue » finiraient par se contredire à la traduction suivante.
export function BrandWordmark({
    brand,
    className,
    tailClassName,
}: {
    brand: string;
    className?: string;
    /** Sert à masquer le domaine sous une largeur donnée : voir l'en-tête. */
    tailClassName?: string;
}) {
    const dot = brand.indexOf('.');
    const head = dot === -1 ? brand : brand.slice(0, dot);
    const tail = dot === -1 ? '' : brand.slice(dot);

    return (
        <span className={`font-[family-name:var(--font-display)] tracking-tight ${className ?? ''}`}>
            <span className="font-semibold">{head}</span>
            <span className={`font-medium text-fg-muted ${tailClassName ?? ''}`}>{tail}</span>
        </span>
    );
}
