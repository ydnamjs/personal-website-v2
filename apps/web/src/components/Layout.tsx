import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/cooking", label: "Cooking" },
  { to: "/games", label: "Games" },
  { to: "/interviews", label: "Interviews" },
];

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header>
        <nav aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Your Name</p>
      </footer>
    </>
  );
}