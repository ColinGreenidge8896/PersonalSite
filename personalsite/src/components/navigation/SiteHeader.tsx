import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="container nav-bar">
                <NavLink to="/" className="brand-block">
                    <span className="brand">Colin Greenidge</span>
                    <span className="brand-tagline">
                        Software, systems, and technical experiments
                    </span>
                </NavLink>

                <nav className="nav-links" aria-label="Main navigation">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/"}
                            className={({ isActive }) =>
                                isActive ? "nav-link nav-link-active" : "nav-link"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
