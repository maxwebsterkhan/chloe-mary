"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../theme-toggle/theme-toggle";
import styles from "./navigation.module.scss";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Kind Words" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  // Get current theme and observe changes
  useEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme-status") || "light";
    setTheme(currentTheme as "light" | "dark");

    const observer = new MutationObserver(() => {
      const newTheme =
        document.documentElement.getAttribute("data-theme-status") || "light";
      setTheme(newTheme as "light" | "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme-status"],
    });

    return () => observer.disconnect();
  }, []);

  // Toggle navigation menu
  const toggleNavigation = () => {
    setIsActive((prev) => !prev);
  };

  const closeNavigation = () => {
    setIsActive(false);
  };

  // Lenis scroll handling
  useEffect(() => {
    if (typeof window !== "undefined" && window?.lenis) {
      if (isActive) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }
  }, [isActive]);

  // Close navigation on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        closeNavigation();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  return (
    <nav
      data-navigation-status={isActive ? "active" : "not-active"}
      className={styles.navigation}
      aria-label="Main site navigation"
    >
      {/* Overlay for closing nav */}
      <div
        data-navigation-toggle="close"
        onClick={closeNavigation}
        className={styles["navigation__dark-bg"]}
        tabIndex={isActive ? 0 : -1}
        aria-hidden={!isActive}
      ></div>

      <div className={styles["hamburger-nav"]}>
        <div className={styles["hamburger-nav__bg"]}></div>

        <div className={styles["hamburger-nav__group"]}>
          <p className={styles["hamburger-nav__menu-p"]}>Menu</p>
          <ul
            className={styles["hamburger-nav__ul"]}
            role="menubar"
            aria-label="Main navigation links"
          >
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className={styles["hamburger-nav__li"]}
                  role="none"
                >
                  <Link
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={styles["hamburger-nav__a"]}
                    onClick={closeNavigation}
                    role="menuitem"
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span className={styles["hamburger-nav__p"]}>
                      {link.label}
                    </span>
                    <span className={styles["hamburger-nav__dot"]}></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles["hamburger-nav__footer"]}>
            <div className={styles["hamburger-nav__theme"]}>
              <ThemeToggle />
            </div>
            <p className={styles["hamburger-nav__theme-text"]}>
              Join the {theme === "light" ? "Dark" : "Light"} Side...
            </p>
          </div>
        </div>

        {/* Hamburger toggle button */}
        <button
          type="button"
          data-navigation-toggle="toggle"
          onClick={toggleNavigation}
          className={styles["hamburger-nav__toggle"]}
          aria-label="Toggle navigation"
          aria-expanded={isActive}
        >
          <span className={styles["hamburger-nav__toggle-bar"]}></span>
          <span className={styles["hamburger-nav__toggle-bar"]}></span>
        </button>
      </div>
    </nav>
  );
}
