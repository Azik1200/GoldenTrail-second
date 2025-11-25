import "./BasketList.scss";
import { useMemo, useState } from "react";
import CategoriesForEmtyBasketAndFav from "../CategoriesForEmtyBasketAndFav/CategoriesForEmtyBasketAndFav";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";

const formatCurrency = (value) => {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(number)) return "0 AZN";

  return `${number.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} AZN`;
};

const BasketList = () => {
  const { items, loading, error, removeItem, incrementItem, decrementItem } = useCart();
  const { submitOrder, loading: orderLoading, error: orderError, result } = useOrder();

  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [shippingMethodId, setShippingMethodId] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPrice = items.reduce((sum, item) => {
      const normalizedTotal =
        typeof item.total_price === "number"
          ? item.total_price
          : Number(item.total_price);

      if (Number.isFinite(normalizedTotal)) {
        return sum + normalizedTotal;
      }

      const linePrice = (Number(item.price) || 0) * (Number(item.quantity) || 0);
      return sum + linePrice;
    }, 0);

    return { count, totalPrice };
  }, [items]);

  const hasItems = items.length > 0;

  const handleOrder = async (event) => {
    event.preventDefault();

    try {
      const response = await submitOrder({ paymentMethodId, shippingMethodId });
      setOrderSuccess(response?.message || "Заказ успешно оформлен");
    } catch (err) {
      setOrderSuccess(null);
    }
  };

  return (
    <div className="basket">
      <div className="container">
        <h1 className="basketHeader">
          Товары в корзине[<span>{totals.count}</span>]
        </h1>

        {loading && <p className="emptyText">Загрузка корзины...</p>}
        {error && (
          <p className="emptyText">Не удалось загрузить корзину. Повторите попытку.</p>
        )}

        {hasItems && (
          <div className="basketWrapper">
            <ul className="basketList">
              {items.map((item) => {
                const lineTotal =
                  typeof item.total_price === "number"
                    ? item.total_price
                    : Number(item.total_price) ||
                      (Number(item.price) || 0) * (Number(item.quantity) || 0);

                return (
                  <li
                    className="basketListItem"
                    key={
                      item.id || `${item.product_id}-${item.color || ""}-${item.size || ""}`
                    }
                  >
                    <div className="basketItemImg">
                      {item.image ? (
                        <img src={item.image} alt={item.title || "Cart item"} />
                      ) : (
                        <div className="basketItemPlaceholder" aria-hidden="true" />
                      )}
                    </div>
                    <div className="basketItemInfo">
                      <div className="basketItemInfoTop">
                        <div className="basketItemInfoText">
                          <h3 className="basketItemTitle">{item.title || "Без названия"}</h3>
                          <p className="basketItemDesc">
                            {[item.color, item.size].filter(Boolean).join(" • ") ||
                              "Характеристики отсутствуют"}
                          </p>
                        </div>
                        <div
                          className="goodsItemCounterWrapper"
                          role="group"
                          aria-label="Количество"
                        >
                          <button
                            className="goodsItemCounterMinus"
                            onClick={() => decrementItem(item.id)}
                            aria-label="Уменьшить количество"
                            disabled={loading || !item?.id}
                          >
                            -
                          </button>
                          <div className="goodsItemCounterNumber" aria-live="polite">
                            {item.quantity || 0}
                          </div>
                          <button
                            className="goodsItemCounterPlus"
                            onClick={() => incrementItem(item.id)}
                            aria-label="Добавить единицу"
                            disabled={loading || !item?.id}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="basketItemInfoBottom">
                        <div className="basketItemPrice">
                          <div className="basketItemActualPrice">{formatCurrency(lineTotal)}</div>
                          <div className="basketItemOldPrice">{formatCurrency(item.price)}</div>
                        </div>
                        <button
                          className="basketBtnDelete"
                          onClick={() => removeItem(item.id)}
                          disabled={loading || !item?.id}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <form className="basketResult" onSubmit={handleOrder}>
              <div className="basketResultMain">
                <div className="basketResultMainText">Итого</div>
                <div className="basketResultMainNumbers">
                  <p className="count">{formatCurrency(totals.totalPrice)}</p>
                  <span>Без учета стоимости доставки</span>
                </div>
              </div>
              <div className="basketResultControls">
                <label className="basketResultField">
                  Способ оплаты (ID)
                  <input
                    type="number"
                    min="1"
                    value={paymentMethodId}
                    onChange={(e) => setPaymentMethodId(e.target.value)}
                    disabled={orderLoading || loading}
                  />
                </label>
                <label className="basketResultField">
                  Способ доставки (ID)
                  <input
                    type="number"
                    min="1"
                    value={shippingMethodId}
                    onChange={(e) => setShippingMethodId(e.target.value)}
                    disabled={orderLoading || loading}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mainBtn basketResultBtn"
                disabled={!hasItems || orderLoading || loading}
              >
                {orderLoading ? "Оформление..." : "Оформить заказ"}
              </button>
              <span className="payment">
                Доступные способы оплаты и доставки можно выбрать при оформлении заказа.
              </span>
              {orderSuccess && <p className="orderStatus success">{orderSuccess}</p>}
              {orderError && (
                <p className="orderStatus error">Не удалось оформить заказ. Попробуйте снова.</p>
              )}
              {result?.order_id && (
                <p className="orderStatus success">Номер заказа: {result.order_id}</p>
              )}
            </form>
          </div>
        )}

        {!loading && !hasItems && !error && (
          <div>
            <p className="emptyText">Ваша корзина пуста</p>
            <CategoriesForEmtyBasketAndFav />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketList;
