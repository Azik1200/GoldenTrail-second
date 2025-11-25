import GoodsItem from "../GoodsItem/GoodsItem";
import "./NewGoods.scss";

import useProducts from "../../hooks/useProducts";

const NewGoods = () => {
  const products = useProducts();
  const newProducts = products.filter((p) => p.is_new);

  return (
    <>
      <div className="popularGoods">
        <div className="container">
          <h2 className="popularGoodsHeader">Новинки</h2>
          <div className="popularGoodsWrapper">
            {/* <GoodsItem />
            <GoodsItem />
            <GoodsItem /> */}

            {newProducts.map((p) => (
              <GoodsItem key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewGoods;
