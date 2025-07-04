"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./navigation.module.scss";
import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/kind-words", label: "Kind Words" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const [isBurgerClosing, setIsBurgerClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuClosing(true);
      setIsBurgerClosing(true);
      setIsMobileMenuOpen(false);
      setIsTransitioning(true);

      setTimeout(() => {
        setIsMobileMenuClosing(false);
        setIsBurgerClosing(false);
        setIsTransitioning(false);
      }, 600); // Match CSS transition duration
    } else {
      setIsMobileMenuOpen(true);
      setIsBurgerClosing(false);
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

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Add the scroll lock class and store scroll position
      document.body.classList.add("scroll-locked");
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Get the scroll position before unlocking
      const scrollY = document.body.style.top;

      // Remove the scroll lock class and clean up
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      className={clsx(styles.navigation, {
        [styles["navigation--hidden"]]: !isVisible,
        [styles["menu-open"]]: isMobileMenuOpen,
        [styles["navigation--resizing"]]: isResizing,
      })}
    >
      <Link href="/" className={styles.navigation__logo}>
        <Image
          src="/logo.webp"
          alt="CM Logo"
          unoptimized
          width={66}
          height={32}
          sizes="66px"
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
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <li
              key={item.href}
              className={styles.navigation__item}
              style={{ "--index": index } as React.CSSProperties}
            >
              <Link
                href={item.href}
                className={clsx(styles.navigation__link, {
                  [styles["navigation__link--active"]]: isActive,
                })}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        className={clsx(styles.navigation__burger, {
          [styles["navigation__burger--open"]]: isMobileMenuOpen,
          [styles["navigation__burger--closing"]]: isBurgerClosing,
        })}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <div className={styles["navigation__burger-lines"]}>
          <span className={styles["navigation__burger-line"]}></span>
          <span className={styles["navigation__burger-line"]}></span>
          <span className={styles["navigation__burger-line"]}></span>
        </div>
      </button>
    </div>
  );
}
