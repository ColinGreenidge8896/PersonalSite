import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";

type ProjectCardProps = {
    project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="content-card project-card">
            <div className="project-card-meta">
                <p className="card-kicker">{project.category}</p>
                <span className="project-status">{project.status}</span>
            </div>

            <h3>
                <Link to={`/projects/${project.slug}`} className="project-title-link">
                    {project.title}
                </Link>
            </h3>

            <p className="card-copy">{project.summary}</p>

            <ul className="tag-row">
                {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                        {tag}
                    </li>
                ))}
            </ul>
        </article>
    );
}