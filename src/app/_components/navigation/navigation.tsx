"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./navigation.module.scss";
import Link from "next/link";
import Image from "next/image";
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
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuClosing(true);
      setIsMobileMenuOpen(false);
      setIsTransitioning(true);

      setTimeout(() => {
        setIsMobileMenuClosing(false);
        setIsTransitioning(false);
      }, 1200); // Increased time for items to animate out
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

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

  return (
    <div
      className={clsx(styles.navigation, {
        [styles["navigation--hidden"]]: !isVisible,
        [styles["menu-open"]]: isMobileMenuOpen,
      })}
    >
      <Link href="/" className={styles.navigation__logo}>
        <Image
          src="/cm-icon.png"
          alt="CM Logo"
          width={66}
          height={32}
          className={styles.navigation__logoImage}
        />
      </Link>

      <ul
        className={clsx(styles.navigation__list, {
          [styles["navigation__list--open"]]:
            isMobileMenuOpen && !isMobileMenuClosing,
          [styles["navigation__list--closing"]]: isMobileMenuClosing,
        })}
      >
        {navigationItems.map((item, index) => (
          <li
            key={item.href}
            className={styles.navigation__item}
            style={{ "--index": index } as React.CSSProperties}
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

      <button
        className={clsx(styles.navigation__burger, {
          [styles["navigation__burger--open"]]: isMobileMenuOpen,
        })}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className={styles["navigation__burger-icon"]} />
        ) : (
          <Menu className={styles["navigation__burger-icon"]} />
        )}
      </button>
    </div>
  );
}
