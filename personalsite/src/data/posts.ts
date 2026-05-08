export type PostPreview = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

export const allPosts: PostPreview[] = [
    {
        slug: "printing-the-pi-case",
        title: "3D Printing the Raspberry Pi Case",
        date: "April 2026",
        summary:
            "Design choices, printing lessons, and practical considerations from building a case for my self-hosted portfolio server.",
        tags: ["3D Printing", "Raspberry Pi", "Hardware"],
    },
    {
        slug: "setting-up-tailscale-funnel",
        title: "Using Tailscale Funnel with nginx",
        date: "April 2026",
        summary:
            "How I exposed my Raspberry Pi hosted site safely without relying on traditional public SSH or broad router port forwarding.",
        tags: ["Networking", "Raspberry Pi", "Tailscale", "nginx"],
    },
    {
        slug: "galaxy-nas",
        title: "Turning an Old Samsung Galaxy into a Home NAS",
        date: "May 2026",
        summary:
            "Using Syncthing and Tailscale to turn a spare Samsung Galaxy S20 into a self-hosted alternative to cloud storage.",
        tags: ["Self-Hosted", "Syncthing", "Tailscale", "Android"],
    },
    {
        slug: "network-security-lab-overview",
        title: "An Overview of My Network Security Lab",
        date: "May 2026",
        summary:
            "A walk-through of the virtual lab environment from my network security course, the defensive setup, and the categories of attacks the labs cover.",
        tags: ["Security", "Networking", "Virtualization", "School"],
    },
];

export const latestPosts = allPosts.slice(0, 3);

export function getPostBySlug(slug: string): PostPreview | undefined {
    return allPosts.find((post) => post.slug === slug);
}