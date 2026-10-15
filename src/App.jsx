
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GoldScene from "./components/GoldScene";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="site-wrapper"> 
           <GoldScene className="gold-background" />
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

          <Route
            path="/gold-scene"
            element={<GoldScene />}
          />
        </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}