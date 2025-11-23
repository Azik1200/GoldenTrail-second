import "./BasketList.scss";
import img1 from "./../../assets/img/goods/1.png";
import CategoriesForEmtyBasketAndFav from "../CategoriesForEmtyBasketAndFav/CategoriesForEmtyBasketAndFav";

const BasketList = () => {
  return (
    <div className="basket">
      <div className="container">
        <h1 className="basketHeader">
          Товары в корзине[<span>1</span>]
        </h1>
        <div className="basketWrapper">
          <ul className="basketList">
            <li className="basketListItem">
              <div className="basketItemImg">
                <img src={img1} alt="GoodsName" />
              </div>
              <div className="basketItemInfo">
                <div className="basketItemInfoTop">
                  <div className="basketItemInfoText">
                    <h3 className="basketItemTitle">Strell PowerSteel 35</h3>
                    <p className="basketItemDesc">
                      Современный котёл в металлическом корпусе
                    </p>
                  </div>
                  <div
                    className="goodsItemCounterWrapper"
                    role="group"
                    aria-label="Счётчик товара"
                  >
                    <button
                      className="goodsItemCounterPlus"
                      aria-label="Увеличить"
                    >
                      +
                    </button>
                    <div className="goodsItemCounterNumber" aria-live="polite">
                      1
                    </div>
                    <button
                      className="goodsItemCounterMinus"
                      aria-label="Уменьшить"
                    >
                      –
                    </button>
                  </div>
                </div>
                <div className="basketItemInfoBottom">
                  <div className="basketItemPrice">
                    <div className="basketItemActualPrice">3 200 AZN</div>
                    <div className="basketItemOldPrice">3 800 AZN</div>
                  </div>
                  <button className="basketBtnDelete">Удалить</button>
                </div>
              </div>
            </li>
            <li className="basketListItem">
              <div className="basketItemImg">
                <img src={img1} alt="GoodsName" />
              </div>
              <div className="basketItemInfo">
                <div className="basketItemInfoTop">
                  <div className="basketItemInfoText">
                    <h3 className="basketItemTitle">Strell PowerSteel 35</h3>
                    <p className="basketItemDesc">
                      Современный котёл в металлическом корпусе
                    </p>
                  </div>
                  <div
                    className="goodsItemCounterWrapper"
                    role="group"
                    aria-label="Счётчик товара"
                  >
                    <button
                      className="goodsItemCounterPlus"
                      aria-label="Увеличить"
                    >
                      +
                    </button>
                    <div className="goodsItemCounterNumber" aria-live="polite">
                      1
                    </div>
                    <button
                      className="goodsItemCounterMinus"
                      aria-label="Уменьшить"
                    >
                      –
                    </button>
                  </div>
                </div>
                <div className="basketItemInfoBottom">
                  <div className="basketItemPrice">
                    <div className="basketItemActualPrice">3 200 AZN</div>
                    <div className="basketItemOldPrice">3 800 AZN</div>
                  </div>
                  <button className="basketBtnDelete">Удалить</button>
                </div>
              </div>
            </li>
          </ul>
          <div className="basketResult">
            <div className="basketResultDiscount">
              <span>Скидка</span>
              <span>-3 800AZN</span>
            </div>
            <div className="basketResultMain">
              <div className="basketResultMainText">Итого</div>
              <div className="basketResultMainNumbers">
                <p className="count">3 200 AZN</p>
                <span>Без учета стоимости доставки</span>
              </div>
            </div>
            <button className="mainBtn basketResultBtn">Купить в 1 клик</button>
            <span className="payment">
              Доступные способы оплаты и доставки можно выбрать при оформлении
              заказа.
            </span>
          </div>
        </div>

        {/* если товаров нет */}

        <h1 className="basketHeader">
          Товары в корзине[<span>0</span>]
          <p className="emptyText">Ваша корзина пуста</p>
          <CategoriesForEmtyBasketAndFav />
        </h1>
      </div>
    </div>
  );
};

export default BasketList;
