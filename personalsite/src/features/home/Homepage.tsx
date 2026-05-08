import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import { latestPosts } from "../../data/posts";
import { ProjectCard } from "../../components/ui/ProjectCard";

const workshopPhotos = [
    {
        src: "/images/printing-the-pi-case/finished-in-use.jpg",
        alt: "The 3D printed Raspberry Pi case in use, with cables connected",
        caption: "Pi running nginx in its 3D printed case",
    },
    {
        src: "/images/printing-the-pi-case/scraps.jpg",
        alt: "A box full of failed 3D prints from the Pi case build",
        caption: "Iteration history",
    },
    {
        src: "/images/printing-the-pi-case/finished-on-printer.jpg",
        alt: "The finished case sitting on the 3D printer bed",
        caption: "Fresh off the print bed",
    },
];

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
                            <p className="card-kicker">{post.date}</p>
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
