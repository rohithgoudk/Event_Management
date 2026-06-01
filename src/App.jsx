import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<NotFound />} />
        <Route path="/services" element={<NotFound />} />
        <Route path="/gallery" element={<NotFound />} />
        <Route path="/contact" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;