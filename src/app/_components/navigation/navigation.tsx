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
    } else {
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
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Allow time for the transition to complete
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350); // Match CSS transition timing
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
              isMobileMenuOpen && styles.visible
            )}
          >
            <Link
              href={item.href}
              className={styles.navigation__link}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 350);
                }
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
