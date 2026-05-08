import { Routes, Route } from "react-router-dom";
import { SiteLayout } from "../layout/SiteLayout";
import { HomePage } from "../../features/home/Homepage";
import { ProjectsPage } from "../../features/projects/ProjectsPage";
import { ProjectDetailPage } from "../../features/projects/ProjectDetailPage";
import { BlogPage } from "../../features/blog/BlogPage";
import { PostDetailPage } from "../../features/blog/PostDetailPage";
import { AboutPage } from "../../features/about/AboutPage";
import { ContactPage } from "../../features/contact/ContactPage";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<ProjectDetailPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<PostDetailPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
            </Route>
        </Routes>
    );
}