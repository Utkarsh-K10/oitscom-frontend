import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import { useState } from "react";
import Signup from "./pages/authpages/Signup";

function App() {
  const [isUserPresent, setIsUserPresent] = useState(false);
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          justifyContent: "stretch",
        }}
      >
        {!isUserPresent ? (
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Signup />} />
          </Routes>
        ) : (
          <>
            <Layout />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Product />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
