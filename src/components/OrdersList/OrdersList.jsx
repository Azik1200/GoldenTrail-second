import { useState } from "react";
import useOrders from "../../hooks/useOrders";
import useOrderDetails from "../../hooks/useOrderDetails";
import "./OrdersList.scss";

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString.replace(/-/g, "/"));
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString();
};

const OrdersList = () => {
  const { orders, loading, error } = useOrders();
  const { detailsById, loadDetails, loading: detailsLoading, error: detailsError } =
    useOrderDetails();
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = async (orderId) => {
    if (expandedId === orderId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(orderId);

    if (!detailsById[orderId]) {
      try {
        await loadDetails(orderId);
      } catch (_) {
        // Error is handled by hook state
      }
    }
  };

  return (
    <section className="orders">
      <div className="container">
        <div className="orders__header">
          <h2>Мои заказы</h2>
          {loading && <span className="orders__status">Загрузка...</span>}
          {error && (
            <span className="orders__status orders__status--error">
              Не удалось загрузить заказы. Попробуйте позже.
            </span>
          )}
        </div>

        {!loading && !error && orders.length === 0 && (
          <p className="orders__empty">У вас пока нет заказов.</p>
        )}

        <div className="orders__grid">
          {orders.map((order) => (
            <div key={order.id} className="orders__card">
              <div className="orders__row">
                <span className="orders__label">Номер</span>
                <span className="orders__value">#{order.id}</span>
              </div>
              <div className="orders__row">
                <span className="orders__label">Статус</span>
                <span className="orders__value orders__badge">{order.status}</span>
              </div>
              <div className="orders__row">
                <span className="orders__label">Сумма</span>
                <span className="orders__value">{order.total_amount}</span>
              </div>
              <div className="orders__row">
                <span className="orders__label">Товаров</span>
                <span className="orders__value">{order.items_count}</span>
              </div>
              <div className="orders__row">
                <span className="orders__label">Дата</span>
                <span className="orders__value">{formatDate(order.created_at)}</span>
              </div>
              <button
                type="button"
                className="orders__details-btn"
                onClick={() => handleToggle(order.id)}
              >
                {expandedId === order.id ? "Скрыть детали" : "Показать детали"}
              </button>

              {expandedId === order.id && (
                <div className="orders__details">
                  {detailsLoading && <p className="orders__status">Загрузка деталей...</p>}
                  {detailsError && (
                    <p className="orders__status orders__status--error">
                      Не удалось загрузить детали заказа.
                    </p>
                  )}

                  {!detailsLoading && !detailsError && detailsById[order.id] && (
                    <>
                      <div className="orders__details-meta">
                        <div>
                          <span className="orders__label">Оплата:</span>
                          <span className="orders__value">
                            {detailsById[order.id].payment_method || "—"}
                          </span>
                        </div>
                        <div>
                          <span className="orders__label">Доставка:</span>
                          <span className="orders__value">
                            {detailsById[order.id].shipping_method || "—"}
                          </span>
                        </div>
                      </div>

                      <div className="orders__items">
                        {Array.isArray(detailsById[order.id].items) &&
                          detailsById[order.id].items.map((item) => (
                            <div key={`${item.product_id}-${item.title}`} className="orders__item">
                              {item.image && (
                                <img src={item.image} alt={item.title} className="orders__item-image" />
                              )}
                              <div className="orders__item-info">
                                <div className="orders__item-title">{item.title}</div>
                                <div className="orders__item-meta">
                                  <span>Кол-во: {item.quantity}</span>
                                  <span>Цена: {item.price}</span>
                                  <span>Сумма: {item.total}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrdersList;
