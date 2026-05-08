const postModules = import.meta.glob('../content/posts/*.md', {
    query: '?raw',
    import: 'default',
}) as Record<string, () => Promise<string>>;

export async function getPostContent(slug: string): Promise<string | null> {
    const key = `../content/posts/${slug}.md`;
    const loader = postModules[key];
    if (!loader) return null;
    return loader();
}
