import { parseFrontmatter } from "./frontmatter";

const postModules = import.meta.glob("../content/posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export type Post = {
    slug: string;
    title: string;
    date: string;        // ISO YYYY-MM-DD, used for sorting
    displayDate: string; // formatted for display
    summary: string;
    tags: string[];
    content: string;     // markdown body without frontmatter
};

// Kept for backward compatibility with existing imports.
export type PostPreview = Post;

function formatDate(iso: string): string {
    if (!iso) return "";
    const date = new Date(iso + "T00:00:00");
    if (isNaN(date.getTime())) return iso;
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
}

function asString(value: string | string[] | undefined, fallback = ""): string {
    if (Array.isArray(value)) return value.join(", ");
    return value ?? fallback;
}

function asStringArray(value: string | string[] | undefined): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.length > 0) return [value];
    return [];
}

const posts: Post[] = Object.entries(postModules)
    .map(([path, raw]) => {
        const slugMatch = path.match(/\/([^/]+)\.md$/);
        const slug = slugMatch ? slugMatch[1] : "";
        const { metadata, content } = parseFrontmatter(raw);
        const date = asString(metadata.date);
        return {
            slug,
            title: asString(metadata.title, slug),
            date,
            displayDate: formatDate(date),
            summary: asString(metadata.summary),
            tags: asStringArray(metadata.tags),
            content,
        };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

export const allPosts = posts;
export const latestPosts = posts.slice(0, 3);

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find((post) => post.slug === slug);
}
