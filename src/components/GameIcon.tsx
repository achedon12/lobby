import { Moon, Spade, type LucideIcon } from 'lucide-react';
import type { GameIconKey } from '@/data/games';

// La correspondance clé → composant vit ici, et nulle part ailleurs :
// `data/games.ts` est importé par le sitemap et le JSON-LD, qui ne doivent
// rien savoir de React.
const ICONS: Record<GameIconKey, LucideIcon> = {
    spade: Spade,
    moon: Moon,
};

export function GameIcon({ name, className }: { name: GameIconKey; className?: string }) {
    const Icon = ICONS[name];
    return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
}
