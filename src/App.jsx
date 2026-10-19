
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Gallery = lazy(() => import("./components/AboutGoldSuree"));
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

            <Route path="/gallery" element={<Gallery />} />

            <Route
              path="/why-goldsuree"
              element={<Navigate to="/gallery" replace />}
            />

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
