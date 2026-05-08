import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../../data/posts";
import { getPostContent } from "../../data/postContent";

export function PostDetailPage() {
    const { slug } = useParams();
    const post = getPostBySlug(slug ?? "");
    const [content, setContent] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        getPostContent(slug).then((result) => {
            if (result === null) setNotFound(true);
            else setContent(result);
        });
    }, [slug]);

    if (!post || notFound) {
        return (
            <section className="container page-section">
                <h1>Post not found</h1>
                <p>The requested post does not exist.</p>
                <Link to="/blog" className="text-link">
                    Back to writing
                </Link>
            </section>
        );
    }

    return (
        <section className="container page-section post-detail">
            <Link to="/blog" className="post-back-link">
                &larr; Back to writing
            </Link>

            <header className="post-header">
                <p className="eyebrow">{post.date}</p>
                <h1>{post.title}</h1>
                <p className="post-summary">{post.summary}</p>
                <ul className="tag-row">
                    {post.tags.map((tag) => (
                        <li key={tag} className="tag">
                            {tag}
                        </li>
                    ))}
                </ul>
            </header>

            <div className="post-body prose">
                {content !== null ? (
                    <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                    <p className="card-copy">Loading...</p>
                )}
            </div>
        </section>
    );
}
