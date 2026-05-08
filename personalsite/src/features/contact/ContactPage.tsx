export function ContactPage() {
    const links = [
        {
            label: "Email",
            display: "colin.b.greenidge@gmail.com",
            href: "mailto:colin.b.greenidge@gmail.com",
        },
        {
            label: "GitHub",
            display: "github.com/ColinGreenidge8896",
            href: "https://github.com/ColinGreenidge8896",
        },
        {
            label: "LinkedIn",
            display: "linkedin.com/in/colin-greenidge",
            href: "https://linkedin.com/in/colin-greenidge",
        },
    ];

    return (
        <section className="container page-section">
            <div className="section-heading">
                <h1 className="page-title">Contact</h1>
                <p>The best way to reach me is by email.</p>
            </div>

            <div className="contact-links">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="contact-item"
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                    >
                        <span className="card-kicker">{link.label}</span>
                        <span className="contact-item-display">{link.display}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
