import GoodsItem from "../GoodsItem/GoodsItem";
import "./PopularGoods.scss";

const PopularGoods = () => {
  return (
    <>
      <div className="popularGoods">
        <div className="container">
          <h2 className="popularGoodsHeader">Популярные товары</h2>
          <div className="popularGoodsWrapper">
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularGoods;
