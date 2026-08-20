import { Fragment, type ReactNode } from 'react';
import { AUTHOR } from '@/lib/site';

const authorAnchor = (
    <a
        href={AUTHOR.site}
        rel="author"
        className="font-medium text-fg underline-offset-4 hover:underline"
    >
        {AUTHOR.name}
    </a>
);

/**
 * Remplace le jeton `{author}` d'une chaîne traduite par un lien vers le site
 * personnel de l'auteur.
 *
 * Les dictionnaires ne contiennent QUE des chaînes — y glisser du JSX les
 * empêcherait de traverser la frontière serveur → client. Le jeton laisse donc
 * chaque langue placer le nom où sa grammaire l'exige : « Créé par {author} »,
 * mais « {author}, Entwickler » ou « wird von {author} herausgegeben ». Couper
 * la phrase en deux moitiés figées aurait imposé l'ordre des mots français à
 * l'allemand.
 */
export function AuthorLink({ template }: { template: string }): ReactNode {
    const parts = template.split('{author}');
    if (parts.length === 1) return template;

    return parts.map((part, index) => (
        <Fragment key={index}>
            {part}
            {index < parts.length - 1 && authorAnchor}
        </Fragment>
    ));
}
