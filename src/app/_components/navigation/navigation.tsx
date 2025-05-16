"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./navigation.module.scss";
import Link from "next/link";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/connect", label: "Connect" },
  { href: "/info", label: "Info" },
  { href: "/stories", label: "Stories" },
] as const;

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      // How far the user has scrolled
      const currentScrollY = window.scrollY;

      // Don't hide nav at the very top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when scrolling down, show when scrolling up
      // Only act if there's a significant scroll difference (5px)
      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        setLastScrollY(currentScrollY);
        return;
      }

      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", controlNavbar);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={clsx(
        styles.navigation,
        !isVisible && styles["navigation--hidden"]
      )}
    >
      <ul className={styles.navigation__list}>
        {navigationItems.map((item) => (
          <li key={item.href} className={styles.navigation__item}>
            <Link href={item.href} className={styles.navigation__link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
