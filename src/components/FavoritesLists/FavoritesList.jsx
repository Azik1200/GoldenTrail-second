import "./FavoritesList.scss";
import img1 from "./../../assets/img/goods/1.png";
import CategoriesForEmtyBasketAndFav from "../CategoriesForEmtyBasketAndFav/CategoriesForEmtyBasketAndFav";

const FavoritesList = () => {
  return (
    <div className="favoritesListSection">
      <div className="container">
        {/* если товары есть */}
        <div className="isGoodsTRUE">
          <h1 className="favoritesListHeader">
            Товары в избранном[<span>1</span>]
          </h1>
          <ul className="favoritesList">
            <li className="favoritesListItem">
              <div className="favlistLeft">
                <div className="favListImg">
                  <img src={img1} alt="Good's Name" />
                </div>
                <div className="favListInfo">
                  <div className="favListItemInfoTop">
                    <div className="favListItemInfoText">
                      <h3 className="favListItemTitle">Strell PowerSteel 35</h3>
                      <p className="favListItemDesc">
                        Современный котёл в металлическом корпусе
                      </p>
                    </div>
                  </div>
                  <div className="favListItemPrice">
                    <div className="favListItemActualPrice">3 200 AZN</div>
                    <div className="favListItemOldPrice">3 800 AZN</div>
                  </div>
                </div>
              </div>
              <div className="favListItemRight">
                <div className="favListItemRightTop">
                  <button className="mainBtn favListAddToBasket">
                    Добавить в корзину
                  </button>
                  <button className="mainBtn">Купить в 1 клик</button>
                </div>
                <button className="favListItemDelete">Удалить</button>
              </div>
            </li>
            <li className="favoritesListItem">
              <div className="favlistLeft">
                <div className="favListImg">
                  <img src={img1} alt="Good's Name" />
                </div>
                <div className="favListInfo">
                  <div className="favListItemInfoTop">
                    <div className="favListItemInfoText">
                      <h3 className="favListItemTitle">Strell PowerSteel 35</h3>
                      <p className="favListItemDesc">
                        Современный котёл в металлическом корпусе
                      </p>
                    </div>
                  </div>
                  <div className="favListItemPrice">
                    <div className="favListItemActualPrice">3 200 AZN</div>
                    <div className="favListItemOldPrice">3 800 AZN</div>
                  </div>
                </div>
              </div>
              <div className="favListItemRight">
                <div className="favListItemRightTop">
                  <button className="mainBtn favListAddToBasket">
                    Добавить в корзину
                  </button>
                  <button className="mainBtn">Купить в 1 клик</button>
                </div>
                <button className="favListItemDelete">Удалить</button>
              </div>
            </li>
          </ul>
          <div className="favoritesListTotal">
            <div className="favoritesListTotalTop">
              <div className="favoritesListTotalLeft">
                <p className="favoritesListTotalMainText">Итого</p>
                <p className="favoritesListTotalText">
                  Доступные способы оплаты и доставки можно выбрать при
                  оформлении заказа.
                </p>
              </div>
              <div className="favoritesListTotalRight">
                <p className="favoritesListTotalMainText">3 200 AZN</p>
                <p className="favoritesListTotalText">
                  Без учета стоимости доставки
                </p>
              </div>
            </div>
            <div className="favoritesListTotalBottom">
              <button className="mainBtn favListTotalBtn">
                Добавить все в корзину
              </button>
              <button className="favListItemDelete">Очистить избранное</button>
            </div>
          </div>
        </div>
        <div className="isGoodsFALSE">
          <h1 className="basketHeader">
            Товары в корзине[<span>0</span>]
            <p className="emptyText">Ваша корзина пуста</p>
            <CategoriesForEmtyBasketAndFav />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
