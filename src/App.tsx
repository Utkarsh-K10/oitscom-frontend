import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import { useEffect, useState } from "react";
import Signup from "./pages/authpages/Signup";
import { useUser } from "./context/user/UserProvider";
import Category from "./pages/Category";

function App() {
  const { isAdminPresent }: any = useUser();
  const [isUserPresent, setIsUserPresent] = useState(isAdminPresent);
  const localStorageItems = () => {
    const getAdminFromLocal: any = localStorage.getItem("admin");
    const localvalue = JSON.parse(getAdminFromLocal);
    if (localvalue) {
      setIsUserPresent(localvalue[1].isLoggedInAdmin);
    }
  };

  useEffect(() => {
    localStorageItems();
  }, [isAdminPresent]);
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
              <Route path="/category" element={<Category />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
