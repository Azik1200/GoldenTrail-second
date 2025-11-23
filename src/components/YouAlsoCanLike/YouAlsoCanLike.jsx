// src/components/PopularGoods/PopularGoods.jsx
import GoodsItem from "../GoodsItem/GoodsItem";
import products from "../../tools/Products";

const YouAlsoCanLike = () => {
  return (
    <div className="popularGoods">
      <div className="container">
        <h2 className="popularGoodsHeader">Вам так же может понравиться</h2>
        <div className="popularGoodsWrapper">
          {products.map((p) => (
            <GoodsItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouAlsoCanLike;
