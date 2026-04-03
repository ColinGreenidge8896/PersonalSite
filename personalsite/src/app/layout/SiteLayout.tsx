import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SiteHeader } from "../../components/navigation/SiteHeader";
import { SiteFooter } from "../../components/navigation/SiteFooter";
import { TextPhysicsToggle } from "../../features/text-physics/TextPhysicsToggle";
import { TextPhysicsSandbox } from "../../features/text-physics/TextPhysicsSandbox";

export function SiteLayout() {
    const [physicsMode, setPhysicsMode] = useState(false);

    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Outlet />
            </main>
            <SiteFooter />
            <TextPhysicsToggle
                active={physicsMode}
                onToggle={() => setPhysicsMode((p) => !p)}
            />
            {physicsMode && <TextPhysicsSandbox />}
        </div>
    );
}