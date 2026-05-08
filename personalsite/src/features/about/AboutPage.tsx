export function AboutPage() {
    const languages = [
        "Python",
        "C",
        "C++",
        "JavaScript",
        "TypeScript",
        "HTML / CSS",
        "SQL",
        "C#",
        "Java",
        "Qt",
        "Bash",
        "PowerShell",
    ];
    const frameworks = [
        "React",
        "React Router",
        "Vite",
        "Node.js",
        "Express",
        "Flask",
        "CROW",
        "Unity",
        "Pandas",
        "Matplotlib",
        "ReactMarkdown",
    ];
    const infrastructure = [
        "Linux",
        "Docker",
        "nginx",
        "Tailscale",
        "Syncthing",
        "OpenVPN",
        "Wireshark",
        "Git",
        "GitHub Actions",
        "Microsoft Azure",
        "CMake",
        "Visual Studio",
        "VirtualBox",
        "OPNsense",
        "JMeter",
        "Raspberry Pi",
        "3D Printing",
    ];
    const architecture = [
        "REST APIs",
        "Client-Server Architecture",
        "Socket Programming",
        "TCP / UDP",
        "Custom Binary Protocols",
        "HTTP Server Implementation",
        "Cross-Platform Development",
        "Object-Oriented Design",
        "Design Patterns",
        "Database Design",
        "Database Normalization",
        "Systems Analysis & Design",
    ];
    const practices = [
        "TDD",
        "Unit & Integration Testing",
        "Performance Testing",
        "CI/CD",
        "Code Review & PR Workflow",
        "Concurrent / Parallel Programming",
        "Multithreading",
        "Performance Optimization",
        "Data Analysis",
        "Self-Hosting",
        "System Administration",
        "Game Development",
    ];
    const security = [
        "Authentication Systems",
        "Zero-Trust Architecture",
        "Active Directory",
        "Group Policy",
        "Network Architecture",
        "Firewall Configuration",
        "VPN Configuration",
        "Penetration Testing",
        "ARP Poisoning / MITM",
        "Browser Exploitation",
        "Pass-the-Hash",
        "Kerberoasting",
        "Vulnerability Scanning",
        "Software Security",
    ];

    return (
        <div className="about-page">
            <section className="container page-section">
                <div className="about-page-content">

                    <div className="about-intro">
                        <p className="eyebrow">Computer Science, Conestoga College</p>
                        <h1 className="page-title">Colin Greenidge</h1>
                        <p className="hero-copy">
                            Fourth-year CS student in the network security stream at Conestoga
                            College in Waterloo, Ontario. I build software across web
                            development, backend systems, and self-hosted infrastructure, with
                            a particular interest in business applications, system integration,
                            and practical tools that solve real problems.
                        </p>
                    </div>

                    <div className="content-card about-coop">
                        <p className="card-kicker">Seeking co-op</p>
                        <p>
                            Looking for co-op placements for the summer and fall 2026 terms.
                            Particularly interested in roles involving business application
                            development, system integration, and data solutions. 3.78 GPA.
                        </p>
                        <a href="mailto:colin.b.greenidge@gmail.com" className="text-link about-coop-link">
                            Get in touch
                        </a>
                    </div>

                    <div className="two-column-grid">
                        <div>
                            <div className="section-heading">
                                <h2>What I build</h2>
                            </div>
                            <div className="stack-list">
                                <p className="card-copy">
                                    Outside of coursework I gravitate toward infrastructure
                                    and tools that I actually use. My portfolio runs on a
                                    Raspberry Pi I set up and 3D printed a case for. My home
                                    storage runs on a repurposed Samsung Galaxy S20 using
                                    Syncthing and Tailscale.
                                </p>
                                <p className="card-copy">
                                    I am also building a personal assistant application that
                                    uses a locally hosted AI model for everyday data processing,
                                    with the Claude API for deeper analysis. The goal is
                                    something that genuinely learns your patterns and surfaces
                                    useful insights over time.
                                </p>
                                <p className="card-copy">
                                    In school I have been a regular team lead across group
                                    projects, covering database-driven web apps, low-level
                                    networking, parallel programming, and game development.
                                    The network security stream has given me a solid grounding
                                    in secure system design and applied networking.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="section-heading">
                                <h2>Background</h2>
                            </div>
                            <div className="stack-list">
                                <p className="card-copy">
                                    Before and alongside my degree, I worked as a cook at the
                                    University of Guelph, training and managing teams of 15 or
                                    more staff across multiple service stations.
                                </p>
                                <p className="card-copy">
                                    In 2022 I competed in the ACF-Certified cooking competition
                                    at the University of Massachusetts Amherst Annual Chef
                                    Culinary Conference, representing the University of Guelph,
                                    and won a silver medal. The precision, time pressure, and
                                    team coordination from that work transfers more than you
                                    would expect.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="section-heading">
                            <h2>Skills</h2>
                            <p>Languages, tools, and concepts I work with regularly.</p>
                        </div>
                        <div className="skills-grid">
                            <div className="content-card">
                                <p className="card-kicker">Languages</p>
                                <ul className="tag-row">
                                    {languages.map((s) => (
                                        <li key={s} className="tag">{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-card">
                                <p className="card-kicker">Frameworks and Libraries</p>
                                <ul className="tag-row">
                                    {frameworks.map((s) => (
                                        <li key={s} className="tag">{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-card">
                                <p className="card-kicker">Infrastructure and Tools</p>
                                <ul className="tag-row">
                                    {infrastructure.map((s) => (
                                        <li key={s} className="tag">{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-card">
                                <p className="card-kicker">Architecture and Concepts</p>
                                <ul className="tag-row">
                                    {architecture.map((s) => (
                                        <li key={s} className="tag">{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-card">
                                <p className="card-kicker">Engineering Practices</p>
                                <ul className="tag-row">
                                    {practices.map((s) => (
                                        <li key={s} className="tag">{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-card">
                                <p className="card-kicker">Networking and Security</p>
                                <ul className="tag-row">
                                    {security.map((s) => (
                                        <li key={s} className="tag">{s}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
