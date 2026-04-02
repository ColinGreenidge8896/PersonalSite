import { featuredProjects } from "../../data/projects";
import { latestPosts } from "../../data/posts";
import { ProjectCard } from "../../components/ui/ProjectCard";

export function HomePage() {
    return (
        <div className="home-stack">
            <section className="container page-section hero-grid">
                <div>
                    <p className="eyebrow">Software, systems, and technical experiments</p>
                    <h1 className="hero-title">
                        Building practical software with room to grow.
                    </h1>
                </div>

                <div className="hero-side">
                    <p className="hero-copy">
                        I am Colin Greenidge, a Computer Science student building projects
                        across software development, infrastructure, networking, and
                        self-hosted systems.
                    </p>
                    <p className="hero-copy">
                        This site is my portfolio, workshop, and technical journal.
                    </p>
                </div>
            </section>

            <section className="container page-section">
                <div className="section-heading">
                    <h2>Featured Projects</h2>
                    <p>Selected builds, case studies, and technical deep-dives.</p>
                </div>

                <div className="card-grid">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>

            <section className="container page-section two-column-grid">
                <div>
                    <div className="section-heading">
                        <h2>Latest Writing</h2>
                        <p>Notes from ongoing projects and technical experiments.</p>
                    </div>

                    <div className="stack-list">
                        {latestPosts.map((post) => (
                            <article key={post.slug} className="content-card compact-card">
                                <p className="card-kicker">{post.date}</p>
                                <h3>{post.title}</h3>
                                <p className="card-copy">{post.summary}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <aside>
                    <div className="section-heading">
                        <h2>Current Focus</h2>
                        <p>What I am building and refining right now.</p>
                    </div>

                    <div className="content-card">
                        <p className="card-kicker">In Progress</p>
                        <h3>Raspberry Pi hosted portfolio platform</h3>
                        <p className="card-copy">
                            Building a modern React portfolio deployed through nginx on a
                            Raspberry Pi, with Tailscale for remote access and Funnel for
                            secure public exposure.
                        </p>
                    </div>
                </aside>
            </section>
        </div>
    );
}