import { Link } from "react-router-dom";
import { allPosts } from "../../data/posts";

export function BlogPage() {
    return (
        <section className="container page-section">
            <div className="section-heading">
                <h1 className="page-title">Writing</h1>
                <p>Notes from projects, infrastructure experiments, and technical lessons.</p>
            </div>

            <div className="post-list">
                {allPosts.map((post) => (
                    <article key={post.slug} className="post-list-item">
                        <p className="card-kicker">{post.date}</p>
                        <h2>
                            <Link to={`/blog/${post.slug}`} className="post-title-link">
                                {post.title}
                            </Link>
                        </h2>
                        <p className="card-copy">{post.summary}</p>
                        <ul className="tag-row">
                            {post.tags.map((tag) => (
                                <li key={tag} className="tag">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
