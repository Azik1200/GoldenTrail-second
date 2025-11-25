import Form from "./../components/Form/Form";
import BasketList from "../components/BasketList/BasketList";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AddressesCard from "../components/AddressesCard/AddressesCard";
import YouAlsoCanLike from "../components/YouAlsoCanLike/YouAlsoCanLike";
import OrdersList from "../components/OrdersList/OrdersList";

const Basket = () => {
  return (
    <>
      <BasketList />
      <ProfileCard />
      <AddressesCard />
      <OrdersList />
      <YouAlsoCanLike />
      <Form />
    </>
  );
};

export default Basket;
