import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Cooking from "./pages/Cooking";
import Games from "./pages/Games";
import Interviews from "./pages/Interviews";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cooking" element={<Cooking />} />
        <Route path="/games" element={<Games />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}