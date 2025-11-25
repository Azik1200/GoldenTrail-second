import GoodsItem from "../GoodsItem/GoodsItem";
import "./NewGoods.scss";

import useProducts from "../../hooks/useProducts";
import { useLanguageContext } from "../../context/LanguageContext";

const NewGoods = () => {
  const products = useProducts();
  const { t } = useLanguageContext();
  const newProducts = products.filter((p) => p.is_new);

  return (
    <>
      <div className="popularGoods">
        <div className="container">
          <h2 className="popularGoodsHeader">{t("home.newItems")}</h2>
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
