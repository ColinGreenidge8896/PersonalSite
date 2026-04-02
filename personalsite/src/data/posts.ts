export type PostPreview = {
    slug: string;
    title: string;
    date: string;
    summary: string;
};

export const latestPosts: PostPreview[] = [
    {
        slug: "printing-the-pi-case",
        title: "3D Printing the Raspberry Pi Case",
        date: "April 2026",
        summary:
            "Design choices, printing lessons, and practical considerations from building a case for my self-hosted portfolio server.",
    },
    {
        slug: "setting-up-tailscale-funnel",
        title: "Using Tailscale Funnel with nginx",
        date: "April 2026",
        summary:
            "How I exposed my Raspberry Pi hosted site safely without relying on traditional public SSH or broad router port forwarding.",
    },
];