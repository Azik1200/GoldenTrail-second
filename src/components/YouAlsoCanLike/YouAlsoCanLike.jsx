// src/components/PopularGoods/PopularGoods.jsx
import GoodsItem from "../GoodsItem/GoodsItem";
import useProducts from "../../hooks/useProducts";

const YouAlsoCanLike = () => {
  const products = useProducts();
  const limitedProducts = products.slice(0, 4);

  return (
    <div className="popularGoods">
      <div className="container">
        <h2 className="popularGoodsHeader">Вам так же может понравиться</h2>
        <div className="popularGoodsWrapper">
          {limitedProducts.map((p) => (
            <GoodsItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouAlsoCanLike;
