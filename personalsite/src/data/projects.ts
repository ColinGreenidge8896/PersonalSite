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
            "A self-hosted portfolio platform deployed on a Raspberry Pi 4B using nginx, Tailscale SSH, and Tailscale Funnel for secure public access.",
        description:
            "This site runs on a Raspberry Pi 4B sitting on my desk, served through nginx with Tailscale handling both remote administration and public exposure. Rather than relying on a cloud host, I wanted full ownership of the stack and a real reason to get comfortable with Linux server administration. I also 3D printed a custom case for the Pi and documented the infrastructure decisions along the way.",
        year: "2026",
        status: "In Progress",
        tags: ["React", "Raspberry Pi", "nginx", "Tailscale", "Linux"],
        featured: true,
        links: [
            { label: "GitHub", href: "https://github.com/ColinGreenidge8896" },
        ],
        highlights: [
            "Set up a Raspberry Pi 4B as a self-hosted deployment target with a 3D printed case.",
            "Configured nginx to serve the React portfolio and route traffic cleanly.",
            "Used Tailscale SSH for private remote administration without public port exposure.",
            "Exposed the site securely via Tailscale Funnel as an alternative to traditional port forwarding.",
        ],
    },
    {
        slug: "bookez",
        title: "BookEZ Room Booking System",
        category: "Full Stack Web App",
        summary:
            "A room booking platform with user registration, RSVP flows, room availability logic, and load testing, built for a software engineering course project.",
        description:
            "BookEZ is a full-stack room booking application built for a software engineering course. It supports booking creation, registered and unregistered user participation, RSVP workflows, and database-backed validation. I contributed to the backend logic, database design, and testing strategy, including performance testing with JMeter to verify the system under load. The project was containerized with Docker for consistent local and test environments.",
        year: "2026",
        status: "Completed",
        tags: ["Python", "Flask", "MySQL", "Docker", "JMeter"],
        featured: true,
        links: [
            { label: "GitHub", href: "https://github.com/ColinGreenidge8896" },
        ],
        highlights: [
            "Built booking and RSVP flows with database-backed validation logic.",
            "Implemented MySQL-backed data handling for users, rooms, and bookings.",
            "Used Docker to support consistent local and test environments.",
            "Designed and ran performance and functional test suites including JMeter load tests.",
        ],
    },
    {
        slug: "enterprise-simulation",
        title: "Enterprise Simulation Database System",
        category: "Backend / Database",
        summary:
            "Led the database module for a large multi-team enterprise simulation, designing the schema, building REST API endpoints, and containerizing deployment for dev and production.",
        description:
            "A multi-team enterprise simulation project where I owned the database module end-to-end. I designed a normalized relational schema with input validation and sanitization, built a Python and Node.js server routing to MySQL, implemented REST API endpoints with transaction handling, and containerized both dev and production server deployments. I also authored full documentation covering schema definitions, query examples, integration points, and deployment steps for the other teams.",
        year: "2025",
        status: "Completed",
        tags: ["Python", "Node.js", "MySQL", "Docker", "REST API"],
        featured: false,
        links: [],
        highlights: [
            "Designed the normalized relational database schema with input validation and sanitization.",
            "Built REST API endpoints with transaction handling and comprehensive testing.",
            "Containerized dev and production server deployments with Docker.",
            "Authored full documentation covering schema, integration points, and deployment steps.",
        ],
    },
    {
        slug: "roborush",
        title: "RoboRush",
        category: "Game Development",
        summary:
            "A time-based factory management game built during the CVRI Indie Game Jam, featuring robot behavior systems, procedural audio, and randomized daily challenges.",
        description:
            "RoboRush was built over a short game jam window as part of the CVRI Indie Game Jam W2025. The game is a time-based management sim set in a robot-powered factory with randomized daily challenges. I implemented core gameplay systems in C# including robot behavior, factory mechanics, and a repair minigame, while coordinating programming contributions across a multidisciplinary team. I also integrated procedural audio generation to produce varied daily soundtracks, improving replayability.",
        year: "2025",
        status: "Completed",
        tags: ["Unity", "C#", "Game Jam", "Team Project"],
        featured: true,
        links: [
            { label: "GitHub", href: "https://github.com/ColinGreenidge8896" },
        ],
        highlights: [
            "Implemented robot behavior, factory mechanics, and a repair minigame in C#.",
            "Integrated procedural audio generation for varied daily soundtracks.",
            "Coordinated programming contributions across a multidisciplinary team.",
            "Delivered a complete, playable build within strict game jam time constraints.",
        ],
    },
    {
        slug: "galaxy-nas",
        title: "Samsung Galaxy S20 Home NAS",
        category: "Infrastructure / Self-Hosted",
        summary:
            "Repurposed a spare Samsung Galaxy S20 as a home NAS using Syncthing and Tailscale, giving all devices a shared storage target accessible from anywhere.",
        description:
            "Rather than buying dedicated NAS hardware, I configured my unused Samsung Galaxy S20 as a home storage server. Syncthing handles continuous peer-to-peer sync across all my devices, and Tailscale provides secure remote access without exposing any ports publicly. The result is a low-power, always-on storage node that any device on my Tailnet can push to and pull from.",
        year: "2026",
        status: "Completed",
        tags: ["Android", "Syncthing", "Tailscale", "Self-Hosted", "Networking"],
        featured: false,
        links: [],
        highlights: [
            "Configured Syncthing for continuous peer-to-peer file sync across all devices.",
            "Used Tailscale to provide secure remote access without public port exposure.",
            "Repurposed consumer hardware as a low-power always-on storage node.",
        ],
    },
    {
        slug: "personal-assistant",
        title: "Personal Assistant App",
        category: "AI / Mobile",
        summary:
            "A personal assistant that uses a locally hosted AI model for daily data processing and the Claude API for deeper analysis, designed to surface insights about habits and activity patterns.",
        description:
            "An ongoing project to build a personal assistant that genuinely learns from data about my daily life and surfaces useful patterns and insights. A locally hosted AI model handles regular data processing to keep things private and fast, while the Claude API handles deeper analysis tasks. Current work is focused on iOS integration to allow native data sharing from my iPhone, which requires a Mac development environment to deploy.",
        year: "2026",
        status: "In Progress",
        tags: ["Python", "Claude API", "AI", "iOS", "Self-Hosted"],
        featured: false,
        links: [],
        highlights: [
            "Locally hosted AI model for private, low-latency data processing.",
            "Claude API integration for deeper analysis and insight generation.",
            "Designed to ingest device activity data and surface habit patterns over time.",
            "iOS deployment in progress, pending a Mac development environment.",
        ],
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug);
}
