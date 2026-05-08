export type Frontmatter = Record<string, string | string[]>;

export function parseFrontmatter(raw: string): {
    metadata: Frontmatter;
    content: string;
} {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
        return { metadata: {}, content: raw };
    }

    const [, fm, content] = match;
    const metadata: Frontmatter = {};

    for (const line of fm.split(/\r?\n/)) {
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) continue;

        const key = line.slice(0, colonIdx).trim();
        if (!key) continue;

        const rawValue = line.slice(colonIdx + 1).trim();

        if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
            metadata[key] = rawValue
                .slice(1, -1)
                .split(",")
                .map((s) => s.trim().replace(/^["']|["']$/g, ""))
                .filter((s) => s.length > 0);
        } else {
            metadata[key] = rawValue.replace(/^["']|["']$/g, "");
        }
    }

    return { metadata, content: content.replace(/^\s+/, "") };
}
