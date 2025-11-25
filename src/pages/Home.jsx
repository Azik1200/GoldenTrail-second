import About from "../components/About/About";
import Advantages from "../components/Advantages/Advantages";
import Categories from "../components/Categories/Categories";
import Form from "../components/Form/Form";
import NewGoods from "../components/NewGoods/NewGoods";
import PopularGoods from "../components/PopularGoods/PopularGoods";
import SwiperMain from "../components/SwiperMain/SwiperMain";
import Warranty from "../components/Warranty/Warranty";
import Testimonials from "../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <SwiperMain />
      <PopularGoods />
      <Categories />
      <NewGoods />
      <Warranty />
      <Advantages />
      <Testimonials />
      <About />
      <Form />
    </>
  );
};

export default Home;
