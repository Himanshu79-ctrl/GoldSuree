
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const TermsAndConditions = lazy(
  () => import("./pages/TermsAndConditions")
);
const PrivacyPolicy = lazy(
  () => import("./pages/PrivacyPolicy")
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-wrapper">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
