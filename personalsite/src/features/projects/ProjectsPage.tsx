import { projects } from "../../data/projects";
import { ProjectCard } from "../../components/ui/ProjectCard";

export function ProjectsPage() {
    return (
        <section className="container page-section">
            <div className="section-heading">
                <h1>Projects</h1>
                <p>
                    A growing collection of software, infrastructure, and technical work.
                </p>
            </div>

            <div className="card-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}