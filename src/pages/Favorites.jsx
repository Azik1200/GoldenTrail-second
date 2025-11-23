import Form from "./../components/Form/Form";
import FavoritesList from "../components/FavoritesLists/FavoritesList";
import YouAlsoCanLike from "../components/YouAlsoCanLike/YouAlsoCanLike";

const Favotites = () => {
  return (
    <>
      <FavoritesList />
      <YouAlsoCanLike />
      <Form />
    </>
  );
};

export default Favotites;
