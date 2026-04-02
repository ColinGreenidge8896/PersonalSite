import { Outlet } from "react-router-dom";
import { SiteHeader } from "../../components/navigation/SiteHeader";
import { SiteFooter } from "../../components/navigation/SiteFooter";

export function SiteLayout() {
    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    );
}