"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./bold-nav.module.scss";

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

export default function BoldNav() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  // Toggle navigation
  const toggleNavigation = () => {
    setIsActive((prev) => !prev);
  };

  // Close navigation
  const closeNavigation = () => {
    setIsActive(false);
  };

  // Handle Lenis scroll stop/start
  useEffect(() => {
    if (typeof window !== "undefined" && window.lenis) {
      if (isActive) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }
  }, [isActive]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27 && isActive) {
        // ESC key
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
    >
      <div
        data-navigation-toggle="close"
        onClick={closeNavigation}
        className={styles["navigation__dark-bg"]}
      ></div>

      <div className={styles["hamburger-nav"]}>
        <div className={styles["hamburger-nav__bg"]}></div>

        <div className={styles["hamburger-nav__group"]}>
          <p className={styles["hamburger-nav__menu-p"]}>Menu</p>

          <ul className={styles["hamburger-nav__ul"]}>
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <div key={link.href} className={styles["hamburger-nav__li"]}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={styles["hamburger-nav__a"]}
                    onClick={closeNavigation}
                  >
                    <p className={styles["hamburger-nav__p"]}>{link.label}</p>
                    <div className={styles["hamburger-nav__dot"]}></div>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>

        <div
          data-navigation-toggle="toggle"
          onClick={toggleNavigation}
          className={styles["hamburger-nav__toggle"]}
          aria-label="Toggle navigation"
          aria-expanded={isActive}
        >
          <div className={styles["hamburger-nav__toggle-bar"]}></div>
          <div className={styles["hamburger-nav__toggle-bar"]}></div>
        </div>
      </div>
    </nav>
  );
}
