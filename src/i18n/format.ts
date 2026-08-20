// Les dictionnaires ne portent QUE des chaînes : l'interpolation se fait ici,
// à l'usage. Une fonction dans un dictionnaire ne survivrait pas au passage de
// la frontière serveur → client, et rendrait la traduction illisible.
export function format(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) => {
        const value = values[key];
        return value === undefined ? match : String(value);
    });
}
