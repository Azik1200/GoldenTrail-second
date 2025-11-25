import "./BasketList.scss";
import { useMemo, useState } from "react";
import CategoriesForEmtyBasketAndFav from "../CategoriesForEmtyBasketAndFav/CategoriesForEmtyBasketAndFav";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import useLanguage from "../../hooks/useLanguage";

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
  const { t } = useLanguage();

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
      setOrderSuccess(response?.message || t("basket.orderSuccess"));
    } catch (err) {
      setOrderSuccess(null);
    }
  };

  return (
    <div className="basket">
      <div className="container">
        <h1 className="basketHeader">
          {t("basket.title")}[<span>{totals.count}</span>]
        </h1>

        {loading && <p className="emptyText">{t("basket.loading")}</p>}
        {error && <p className="emptyText">{t("basket.error")}</p>}

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
                          <h3 className="basketItemTitle">{item.title || t("basket.noTitle")}</h3>
                          <p className="basketItemDesc">
                            {[item.color, item.size].filter(Boolean).join(" • ") ||
                              t("basket.noCharacteristics")}
                          </p>
                        </div>
                        <div
                          className="goodsItemCounterWrapper"
                          role="group"
                          aria-label={t("basket.quantityAria")}
                        >
                          <button
                            className="goodsItemCounterMinus"
                            onClick={() => decrementItem(item.id)}
                            aria-label={t("basket.decrementAria")}
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
                            aria-label={t("basket.incrementAria")}
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
                          {t("basket.delete")}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <form className="basketResult" onSubmit={handleOrder}>
              <div className="basketResultMain">
                <div className="basketResultMainText">{t("basket.total")}</div>
                <div className="basketResultMainNumbers">
                  <p className="count">{formatCurrency(totals.totalPrice)}</p>
                  <span>{t("basket.totalNote")}</span>
                </div>
              </div>
              <div className="basketResultControls">
                <label className="basketResultField">
                  {t("basket.paymentMethod")}
                  <input
                    type="number"
                    min="1"
                    value={paymentMethodId}
                    onChange={(e) => setPaymentMethodId(e.target.value)}
                    disabled={orderLoading || loading}
                  />
                </label>
                <label className="basketResultField">
                  {t("basket.shippingMethod")}
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
                {orderLoading ? t("basket.submitting") : t("basket.submit")}
              </button>
              <span className="payment">{t("basket.paymentNote")}</span>
              {orderSuccess && <p className="orderStatus success">{orderSuccess}</p>}
              {orderError && (
                <p className="orderStatus error">{t("basket.submitError")}</p>
              )}
              {result?.order_id && (
                <p className="orderStatus success">
                  {t("basket.orderNumber", { orderId: result.order_id })}
                </p>
              )}
            </form>
          </div>
        )}

        {!loading && !hasItems && !error && (
          <div>
            <p className="emptyText">{t("basket.empty")}</p>
            <CategoriesForEmtyBasketAndFav />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketList;
