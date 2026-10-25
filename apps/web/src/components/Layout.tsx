// Link: like NavLink but without the "active" tracking. Good for one-off
//   links such as the site name.
// NavLink: a link that knows when it points at the current page.
// Outlet: placeholder where the matched page renders.
import { Link, NavLink, Outlet } from "react-router-dom";
// Importing a .module.css file gives an object mapping each class name in the
// file to its unique, generated name: styles.header -> "Layout_header__x7k2a".
import styles from "./Layout.module.css";

// Nav links as data. Add a page here (plus its <Route> in App.tsx).
const links = [
  { to: "/", label: "Home" },
  { to: "/credentials", label: "Credentials" },
  { to: "/cooking", label: "Cooking" },
  { to: "/games", label: "Games" },
  { to: "/interviews", label: "Interviews" },
];

// The frame shared by every page. It stays mounted while the page inside
// the <Outlet /> changes.
export default function Layout() {
  return (
    <>
      {/* Hidden until focused; lets keyboard users jump past the nav. */}
      <a href="#main" className={styles.skipLink}>Skip to content</a>

      <header className={styles.header}>
        {/* Inner wrapper keeps header content aligned with the page content. */}
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>Michael Snead</Link>

          <nav aria-label="Main" className={styles.nav}>
            {links.map((l) => (
              // `end` = exact match only, so Home isn't active on every page.
              //
              // className can be a function. NavLink calls it with
              // { isActive } and uses the string we return. We do this
              // because the plain "active" class NavLink adds by default
              // would NOT match a module's renamed .active class. (NavLink
              // still sets aria-current="page" on its own.)
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* The id stays a plain string because the skip link's href="#main"
          targets it by name; CSS Modules only rename classes, not ids.
          tabIndex={-1} lets the skip link move keyboard focus here. */}
      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} Michael Snead</p>
          <p>Built with React and TypeScript</p>
        </div>
      </footer>
    </>
  );
}
