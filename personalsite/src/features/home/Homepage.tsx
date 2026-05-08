import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import { latestPosts } from "../../data/posts";
import { workshopPhotos } from "../../data/workshop";
import { ProjectCard } from "../../components/ui/ProjectCard";

export function HomePage() {
    return (
        <div className="home-stack">
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

            <section className="container page-section">
                <div className="section-heading">
                    <h2>From the workshop</h2>
                    <p>Recent moments from ongoing builds and projects.</p>
                </div>

                <div className="workshop-grid">
                    {workshopPhotos.map((photo) => (
                        <figure key={photo.src} className="workshop-photo">
                            <img src={photo.src} alt={photo.alt} loading="lazy" />
                            <figcaption>{photo.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            <section className="container page-section">
                <div className="section-heading">
                    <h2>Latest Writing</h2>
                    <p>Notes from ongoing projects and technical experiments.</p>
                </div>

                <div className="card-grid">
                    {latestPosts.map((post) => (
                        <article key={post.slug} className="content-card compact-card">
                            <p className="card-kicker">{post.displayDate}</p>
                            <h3>
                                <Link to={`/blog/${post.slug}`} className="project-title-link">
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="card-copy">{post.summary}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
