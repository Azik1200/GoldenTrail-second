import { useMemo, useState } from "react";
import "./FavoritesList.scss";
import CategoriesForEmtyBasketAndFav from "../CategoriesForEmtyBasketAndFav/CategoriesForEmtyBasketAndFav";
import useFavorites from "../../hooks/useFavorites";
import { addOrUpdateCartItem } from "../../api/cart";

const formatPrice = (value) =>
  typeof value === "number" ? `${value.toFixed(2)} AZN` : value || "";

const FavoritesList = () => {
  const { items, loading, error, removeItem } = useFavorites();
  const [addingId, setAddingId] = useState(null);
  const [addingAll, setAddingAll] = useState(false);

  const hasItems = items.length > 0;

  const totalPrice = useMemo(
    () =>
      items.reduce((acc, item) => {
        const price = Number(item.price);
        return Number.isFinite(price) ? acc + price : acc;
      }, 0),
    [items]
  );

  const handleRemove = async (favoriteId) => {
    await removeItem(favoriteId);
  };

  const handleAddToCart = async (productId, price) => {
    if (!productId) return;

    setAddingId(productId);

    try {
      await addOrUpdateCartItem({ productId, quantity: 1, price });
    } catch (err) {
      console.error("Не удалось добавить товар в корзину", err);
    } finally {
      setAddingId(null);
    }
  };

  const handleAddAllToCart = async () => {
    if (!hasItems) return;

    setAddingAll(true);
    try {
      for (const item of items) {
        if (!item.product_id) continue;
        // последовательно добавляем в корзину, чтобы не терять ошибки
        await addOrUpdateCartItem({
          productId: item.product_id,
          quantity: 1,
          price: item.price,
        });
      }
    } catch (err) {
      console.error("Не удалось добавить все товары в корзину", err);
    } finally {
      setAddingAll(false);
    }
  };

  const handleClearAll = async () => {
    if (!hasItems) return;

    await Promise.all(
      items.map((item) => removeItem(item.id || item.favorite_id || item.product_id))
    );
  };

  if (loading && !hasItems) {
    return (
      <div className="favoritesListSection">
        <div className="container">Загрузка избранного...</div>
      </div>
    );
  }

  if (error && !hasItems) {
    return (
      <div className="favoritesListSection">
        <div className="container">Не удалось загрузить избранное</div>
      </div>
    );
  }

  return (
    <div className="favoritesListSection">
      <div className="container">
        {hasItems ? (
          <div className="isGoodsTRUE">
            <h1 className="favoritesListHeader">
              Товары в избранном[<span>{items.length}</span>]
            </h1>
            <ul className="favoritesList">
              {items.map((item) => {
                const title = item.title || item.name || item.sku || "";
                const desc = item.short_description || item.description || item.sku || "";
                const price = formatPrice(item.price);
                const oldPrice = item.oldPrice || (item.discount ? formatPrice(item.oldPrice) : "");

                return (
                  <li className="favoritesListItem" key={item.id || item.product_id}>
                    <div className="favlistLeft">
                      <div className="favListImg">
                        <img src={item.image} alt={title} />
                      </div>
                      <div className="favListInfo">
                        <div className="favListItemInfoTop">
                          <div className="favListItemInfoText">
                            <h3 className="favListItemTitle">{title}</h3>
                            <p className="favListItemDesc">{desc}</p>
                          </div>
                        </div>
                        <div className="favListItemPrice">
                          <div className="favListItemActualPrice">{price}</div>
                          {oldPrice && <div className="favListItemOldPrice">{oldPrice}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="favListItemRight">
                      <div className="favListItemRightTop">
                        <button
                          className="mainBtn favListAddToBasket"
                          onClick={() => handleAddToCart(item.product_id, item.price)}
                          disabled={addingId === item.product_id}
                        >
                          Добавить в корзину
                        </button>
                        <button className="mainBtn">Купить в 1 клик</button>
                      </div>
                      <button
                        className="favListItemDelete"
                        onClick={() => handleRemove(item.id || item.product_id)}
                        disabled={loading}
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="favoritesListTotal">
              <div className="favoritesListTotalTop">
                <div className="favoritesListTotalLeft">
                  <p className="favoritesListTotalMainText">Итого</p>
                  <p className="favoritesListTotalText">
                    Доступные способы оплаты и доставки можно выбрать при оформлении заказа.
                  </p>
                </div>
                <div className="favoritesListTotalRight">
                  <p className="favoritesListTotalMainText">{formatPrice(totalPrice)}</p>
                  <p className="favoritesListTotalText">Без учета стоимости доставки</p>
                </div>
              </div>
              <div className="favoritesListTotalBottom">
                <button
                  className="mainBtn favListTotalBtn"
                  onClick={handleAddAllToCart}
                  disabled={addingAll}
                >
                  Добавить все в корзину
                </button>
                <button
                  className="favListItemDelete"
                  onClick={handleClearAll}
                  disabled={loading}
                >
                  Очистить избранное
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="isGoodsFALSE">
            <h1 className="basketHeader">
              Товары в избранном[<span>0</span>]
              <p className="emptyText">В избранном пока нет товаров</p>
              <CategoriesForEmtyBasketAndFav />
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
