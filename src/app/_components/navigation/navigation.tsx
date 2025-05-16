"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./navigation.module.scss";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuItems, setMenuItems] = useState<boolean[]>(
    Array(navigationItems.length).fill(false)
  );

  useEffect(() => {
    const controlNavbar = () => {
      if (isMobileMenuOpen || isTransitioning) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        setLastScrollY(currentScrollY);
        return;
      }

      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, isMobileMenuOpen, isTransitioning]);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Animate menu items in
      const itemsTimeout = setTimeout(() => {
        setMenuItems(Array(navigationItems.length).fill(true));
      }, 50);

      return () => clearTimeout(itemsTimeout);
    } else {
      // Animate menu items out
      setMenuItems(Array(navigationItems.length).fill(false));

      const scrollY = document.body.style.top;

      // Small delay to avoid animation glitches
      setTimeout(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      }, 50);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMenuToggle = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (isMobileMenuOpen) {
      // If closing, animate items out first
      setMenuItems(Array(navigationItems.length).fill(false));

      // Then close the menu after a brief delay
      setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 150);
    } else {
      // If opening, open menu first
      setIsMobileMenuOpen(true);
    }

    // Allow time for the transition to complete
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350); // Match CSS transition timing
  };

  const handleLinkClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setMenuItems(Array(navigationItems.length).fill(false));

      setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 150);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }
  };

  return (
    <nav
      className={clsx(
        styles.navigation,
        !isVisible && styles["navigation--hidden"],
        isMobileMenuOpen && styles["menu-open"]
      )}
    >
      <button
        className={clsx(
          styles.navigation__burger,
          isMobileMenuOpen && styles["navigation__burger--open"]
        )}
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className={styles["navigation__burger-icon"]} />
        ) : (
          <Menu className={styles["navigation__burger-icon"]} />
        )}
      </button>

      <ul
        className={clsx(
          styles.navigation__list,
          isMobileMenuOpen && styles["navigation__list--open"]
        )}
      >
        {navigationItems.map((item, index) => (
          <li
            key={item.href}
            style={{ "--index": index } as React.CSSProperties}
            className={clsx(
              styles.navigation__item,
              menuItems[index] && styles.visible
            )}
          >
            <Link
              href={item.href}
              className={styles.navigation__link}
              onClick={handleLinkClick}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
