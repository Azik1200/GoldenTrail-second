import GoodsItem from "../GoodsItem/GoodsItem";
import "./NewGoods.scss";

import products from "../../tools/Products";

const NewGoods = () => {
  return (
    <>
      <div className="popularGoods">
        <div className="container">
          <h2 className="popularGoodsHeader">Новинки</h2>
          <div className="popularGoodsWrapper">
            {/* <GoodsItem />
            <GoodsItem />
            <GoodsItem /> */}

            {products.map((p) => (
              <GoodsItem key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewGoods;
