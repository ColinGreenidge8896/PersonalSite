export type Project = {
    slug: string;
    title: string;
    category: string;
    summary: string;
    description: string;
    year: string;
    status: "Completed" | "In Progress" | "Planned";
    tags: string[];
    featured?: boolean;
    links?: {
        label: string;
        href: string;
    }[];
    highlights: string[];
};

export const projects: Project[] = [
    {
        slug: "raspberry-pi-portfolio-platform",
        title: "Raspberry Pi Portfolio Platform",
        category: "Infrastructure / Web",
        summary:
            "A self-hosted portfolio platform deployed on a Raspberry Pi using nginx, Tailscale SSH, and Tailscale Funnel for public access.",
        description:
            "A modern portfolio platform designed to run from my own Raspberry Pi. The project combines React on the frontend with nginx for serving, Tailscale for secure remote administration, and Funnel for public exposure without relying on traditional router-based SSH access.",
        year: "2026",
        status: "In Progress",
        tags: ["React", "Raspberry Pi", "nginx", "Tailscale", "Linux"],
        featured: true,
        links: [
            { label: "GitHub", href: "https://github.com/" },
        ],
        highlights: [
            "Set up a Raspberry Pi as a self-hosted deployment target.",
            "Configured nginx to serve the portfolio and route traffic cleanly.",
            "Used Tailscale SSH for private remote administration.",
            "Exposed the site securely with Tailscale Funnel.",
        ],
    },
    {
        slug: "bookez",
        title: "BookEZ Room Booking System",
        category: "Full Stack Web App",
        summary:
            "A room booking platform with user registration, RSVP flows, room availability logic, and testing workflows built for a software engineering course project.",
        description:
            "BookEZ is a full stack room booking application built for a software engineering project. It supports booking creation, registered and unregistered user participation, RSVP workflows, database-backed validation, and performance testing.",
        year: "2026",
        status: "Completed",
        tags: ["Python", "Flask", "MySQL", "Docker", "JMeter"],
        featured: true,
        links: [
            { label: "GitHub", href: "https://github.com/" },
        ],
        highlights: [
            "Built booking and RSVP flows with validation logic.",
            "Implemented MySQL-backed data handling for users, rooms, and bookings.",
            "Used Docker to support local deployment and testing.",
            "Worked with performance and functional testing tools including JMeter.",
        ],
    },
    {
        slug: "roborush",
        title: "RoboRush",
        category: "Game Development",
        summary:
            "A fast-paced indie game jam project built in Unity with C#, focused on gameplay systems, integration, and rapid team iteration.",
        description:
            "RoboRush was built in a short game jam window with a focus on rapid prototyping, gameplay feel, and team coordination. The project emphasized speed of development, iteration under time pressure, and practical implementation in Unity.",
        year: "2025",
        status: "Completed",
        tags: ["Unity", "C#", "Game Jam", "Team Project"],
        featured: true,
        links: [
            { label: "GitHub", href: "https://github.com/" },
        ],
        highlights: [
            "Built gameplay features under strict time constraints.",
            "Collaborated closely with a team during a game jam environment.",
            "Integrated systems quickly while maintaining a playable build.",
            "Used Unity and C# to deliver a working game in a short cycle.",
        ],
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug);
}