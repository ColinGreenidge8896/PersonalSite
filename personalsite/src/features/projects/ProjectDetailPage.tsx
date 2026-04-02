import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../../data/projects";

export function ProjectDetailPage() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug ?? "");

    if (!project) {
        return (
            <section className="container page-section">
                <h1>Project not found</h1>
                <p>The requested project does not exist.</p>
                <Link to="/projects" className="text-link">
                    Back to projects
                </Link>
            </section>
        );
    }

    return (
        <section className="container page-section project-detail">
            <div className="project-detail-header">
                <p className="eyebrow">{project.category}</p>
                <h1>{project.title}</h1>
                <p className="project-detail-summary">{project.description}</p>
            </div>

            <div className="project-detail-meta">
                <div className="content-card">
                    <p className="card-kicker">Year</p>
                    <p>{project.year}</p>
                </div>

                <div className="content-card">
                    <p className="card-kicker">Status</p>
                    <p>{project.status}</p>
                </div>

                <div className="content-card">
                    <p className="card-kicker">Stack</p>
                    <ul className="tag-row">
                        {project.tags.map((tag) => (
                            <li key={tag} className="tag">
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="project-detail-body two-column-grid">
                <div>
                    <div className="section-heading">
                        <h2>Highlights</h2>
                        <p>Key pieces of the work and what made the project notable.</p>
                    </div>

                    <div className="content-card">
                        <ul className="detail-list">
                            {project.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <aside>
                    <div className="section-heading">
                        <h2>Links</h2>
                        <p>Repositories, demos, and related material.</p>
                    </div>

                    <div className="content-card link-stack">
                        {project.links?.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-link"
                            >
                                {link.label}
                            </a>
                        )) ?? <p className="card-copy">Links coming soon.</p>}
                    </div>
                </aside>
            </div>
        </section>
    );
}