"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./theme-toggle.module.scss";

// ---- Cookie utilities ----
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.startsWith(nameEQ)) return c.slice(nameEQ.length);
  }
  return null;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // ----- Ensure current theme is applied immediately and kept in sync -----
  const updateTheme = useCallback((newTheme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme-status", newTheme);
  }, []);

  // ----- Initialize from cookie or system preference -----
  useEffect(() => {
    const cookieTheme = getCookie("theme");
    if (cookieTheme === "dark" || cookieTheme === "light") {
      setTheme(cookieTheme);
      updateTheme(cookieTheme);
    } else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      updateTheme(initialTheme);
    }
  }, [updateTheme]);

  // ----- Theme toggle logic -----
  const toggleTheme = useCallback(() => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme-status") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    updateTheme(newTheme);
    setCookie("theme", newTheme, 365);
  }, [updateTheme]);

  // ----- Keyboard shortcut (Shift + T) -----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = (e.target as HTMLElement)?.tagName?.toLowerCase?.() ?? "";
      if (
        ["input", "textarea"].includes(tagName) ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if (e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <button
      data-theme-toggle=""
      onClick={toggleTheme}
      className={styles["btn-darklight"]}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      tabIndex={0}
    >
      <div className={styles["btn-darklight__icon"]}>
        <div className={styles["btn-darklight__icon-box"]}>
          {/* Sun Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15.5355 8.46447C17.4882 10.4171 17.4882 13.5829 15.5355 15.5355C13.5829 17.4882 10.4171 17.4882 8.46447 15.5355C6.51184 13.5829 6.51184 10.4171 8.46447 8.46447C10.4171 6.51184 13.5829 6.51184 15.5355 8.46447Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 4V2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22V20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3599 5.63999L19.0699 4.92999"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.93018 19.07L5.64018 18.36"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 12H22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12H4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3599 18.36L19.0699 19.07"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.93018 4.92999L5.64018 5.63999"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={`${styles["btn-darklight__icon-box"]} ${styles["is--absolute"]}`}
        >
          {/* Moon Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18.395 13.027C18.725 12.872 19.077 13.197 18.985 13.55C18.671 14.752 18.054 15.896 17.104 16.846C14.283 19.667 9.77001 19.726 7.02201 16.978C4.27401 14.23 4.33401 9.71601 7.15501 6.89501C8.10501 5.94501 9.24801 5.32801 10.451 5.01401C10.804 4.92201 11.128 5.27401 10.974 5.60401C9.97201 7.74301 10.301 10.305 11.998 12.002C13.694 13.7 16.256 14.029 18.395 13.027Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
