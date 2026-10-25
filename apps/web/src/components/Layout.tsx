// NavLink: React Router's version of <a>. On a plain left click it stops the
//   browser's normal page request, updates the URL locally, and tells the
//   router to redraw. It also adds class="active" and aria-current="page"
//   to itself when its link matches the current URL.
// Outlet: a placeholder that renders the matched child route's element.
import { NavLink, Outlet } from "react-router-dom";

// The nav links described as data. The <NavLink>s below are generated from
// this list, so adding a page means adding one line here (plus its <Route>
// in App.tsx).
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/cooking", label: "Cooking" },
  { to: "/games", label: "Games" },
  { to: "/interviews", label: "Interviews" },
];

// Layout is the frame shared by every page. App.tsx wraps all routes in a
// pathless <Route element={<Layout />}>, so this component renders first and
// the matched page is drawn inside it. Because Layout stays the same as you
// navigate, the header and footer are never torn down and rebuilt.
export default function Layout() {
  return (
    <>
      {/* Skip link: a plain <a> (not a NavLink), so the router ignores it and
          the browser handles the #main jump natively. It is the first
          focusable element on the page, so the first Tab press lands here.
          The CSS hides it off-screen (NOT display: none, which would remove
          it from the tab order) and moves it into view on :focus. It lets
          keyboard users bypass the nav on every page. */}
      <a href="#main" className="skip-link">Skip to content</a>

      {/* <header>, <nav>, <main>, and <footer> look like divs, but they are
          "landmarks": assistive tech such as screen readers can list them and
          jump between them. Lowercase tags are plain HTML; capitalized tags
          (NavLink, Outlet) are React components. */}
      <header>
        {/* aria-label names this landmark, which matters once a page has more
            than one <nav> (e.g. a footer nav) so they can be told apart. */}
        <nav aria-label="Main">
          {/* .map() turns each entry in `links` into a <NavLink>. `key` gives
              React a stable identity for each item in a generated list. */}
          {links.map((l) => (
            // `end` means "active only on an exact URL match". Without it,
            // a link to "/cooking" is also active on "/cooking/some-post"
            // (what we want for most tabs). Home gets `end` so the "/" link
            // is not treated as a prefix of every URL.
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* id="main" is the target of the skip link's href="#main". */}
      <main id="main">
        {/* Outlet is where the matched page renders. For /about, the router
            matches a chain: Layout, then About. It renders Layout, and when
            React reaches <Outlet /> it renders the next route in the chain
            (<About />) right here. Navigating to /cooking swaps in <Cooking />
            while everything around it stays mounted. */}
        <Outlet />
      </main>

      {/* A landmark like the others. It sits after <main> only because we put
          it there in the code. {} lets us drop in JavaScript, so the year updates itself. */}
      <footer>
        <p>© {new Date().getFullYear()} Michael Snead</p>
      </footer>
    </>
  );
}
