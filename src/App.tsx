import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Layout from "./components/Layout";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import AboutLite from "./pages/AboutLite";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/work" element={<Work />} />
    <Route path="/about" element={<AboutLite />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Loader onComplete={setHasLoaded} />
      {hasLoaded && (
        <Layout state="entered">
          <AppRoutes />
        </Layout>
      )}
    </BrowserRouter>
  );
};

export default App;
