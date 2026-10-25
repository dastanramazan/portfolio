import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./sidebar.css";
import Logo from "../../assets/logo_wolf.svg";

const NAV_ITEMS = [
    { id: "home", to: "/", icon: "icon-home", label: "Home" },
    { id: "about", to: "/#about", icon: "icon-user-follow", label: "About" },
    { id: "resume", to: "/#resume", icon: "icon-graduation", label: "Resume" },
    { id: "portfolio", to: "/#portfolio", icon: "icon-briefcase", label: "Portfolio" },
    { id: "services", to: "/#services", icon: "icon-layers", label: "Services" },
    { id: "blog", to: "/blog", icon: "icon-note", label: "Blog" },
    { id: "contact", to: "/#contact", icon: "icon-bubble", label: "Contact" },
];

const Sidebar = () => {
    const [toggle, showMenu] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { pathname } = useLocation();
    const onBlogRoute = pathname.startsWith("/blog");

    // Re-attach when the route changes: the home sections are unmounted on
    // other pages, so the observer must look them up again on the way back.
    // The short delay lets the page transition mount the new route first.
    useEffect(() => {
        if (onBlogRoute) return undefined;
        let observer;
        const timer = setTimeout(() => {
            const sections = NAV_ITEMS
                .map(({ id }) => document.getElementById(id))
                .filter(Boolean);

            if (sections.length === 0) return;

            observer = new IntersectionObserver(
                (entries) => {
                    const visible = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                    if (visible.length > 0) {
                        setActiveSection(visible[0].target.id);
                    }
                },
                { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
            );

            sections.forEach((section) => observer.observe(section));
        }, 450);

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, [pathname, onBlogRoute]);

    const currentId = onBlogRoute ? "blog" : activeSection;

    return (
        <>
            <aside className={toggle ? "aside show-menu" : "aside" }>
                <Link to="/" className="nav__logo">
                    <img src={Logo} alt="logo" />
                </Link>
                <nav className="nav">
                    <div className="nav__menu">
                        <ul className="nav__list">
                            {NAV_ITEMS.map(({ id, to, icon, label }) => (
                                <li className="nav__item" key={id}>
                                    <Link
                                        to={to}
                                        className={currentId === id ? "nav__link active-link" : "nav__link"}
                                        aria-label={label}
                                        onClick={() => showMenu(false)}
                                    >
                                        {currentId === id && (
                                            <motion.span
                                                className="nav__indicator"
                                                layoutId="nav-indicator"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <i className={icon}></i>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="nav__footer">
                    <span className="copyright">The Wolf in the Tech World</span>
                </div>
            </aside>

            <div className={toggle ? "nav__toggle nav__toggle-open" : "nav__toggle"} onClick={() => showMenu(!toggle)}>
                <i className="icon-menu"></i>
            </div>
        </>
    );
};

export default Sidebar;
