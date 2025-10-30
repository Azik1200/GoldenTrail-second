import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Basket from "./pages/Basket";
import Home from "./pages/Home";
import Product from "./pages/Product";
import "./styles/style.scss";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Basket />
      <Product />
      <Footer />
    </>
  );
}

export default App;
