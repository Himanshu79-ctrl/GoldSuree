
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}