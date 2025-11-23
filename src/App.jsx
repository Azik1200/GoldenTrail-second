import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Basket from "./pages/Basket";
import Home from "./pages/Home";
import Product from "./pages/Product";
import "./styles/style.scss";
import Page404 from "./pages/404";
import Favorites from "./pages/Favorites";
import Catalog from "./pages/Catalog";
import BuyInOneClick from "./components/BuyInOneClick/BuyInOneClick";

function App() {
  return (
    <>
      <Header />
      <BuyInOneClick />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/catalog" element={<Catalog />} />
        {/* опционально 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
