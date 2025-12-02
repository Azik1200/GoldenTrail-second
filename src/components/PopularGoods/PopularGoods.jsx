// src/components/PopularGoods/PopularGoods.jsx
import GoodsItem from "../GoodsItem/GoodsItem";
import "./PopularGoods.scss";
import useProducts from "../../hooks/useProducts";
import useLanguage from "../../hooks/useLanguage";

const PopularGoods = () => {
  const products = useProducts();
  const popularProducts = products.filter((p) => p.is_on_sale || p.is_new);
  const { t } = useLanguage();

  return (
    <div className="popularGoods">
      <div className="container">
        <h2 className="popularGoodsHeader">{t("home.popular.title")}</h2>
        <div className="popularGoodsWrapper">
          {popularProducts.map((p) => (
            <GoodsItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularGoods;
