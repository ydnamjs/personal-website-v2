import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Cooking from "./pages/Cooking";
import Games from "./pages/Games";
import Interviews from "./pages/Interviews";
import NotFound from "./pages/NotFound";

// App does no clicking or URL changing itself. It only describes the mapping
// from URL to page. NavLinks (in Layout) trigger navigation, BrowserRouter
// tracks the URL, and <Routes> re-runs this lookup whenever the URL changes.
export default function App() {
  return (
    <Routes>
      {/* A layout route: it has no `path`, so it is not tied to a URL. It
          means "whichever child route matches, render it inside <Layout />."
          The matched child appears where Layout places its <Outlet />. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cooking" element={<Cooking />} />
        <Route path="/games" element={<Games />} />
        <Route path="/interviews" element={<Interviews />} />

        {/* "*" matches any URL not matched above: the 404 page. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}