import GoodsItem from "../GoodsItem/GoodsItem";
import "./NewGoods.scss";

const NewGoods = () => {
  return (
    <>
      <div className="popularGoods">
        <div className="container">
          <h2 className="popularGoodsHeader">Новинки</h2>
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

export default NewGoods;
