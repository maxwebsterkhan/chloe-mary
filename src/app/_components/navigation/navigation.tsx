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
  return (
    <nav className={styles.navigation}>
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
