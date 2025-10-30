import React, { useState } from "react";
import "./GoodsItem.scss";
import goods1 from "./../../assets/img/goods/1.png";

const GoodsItem = () => {
  // 0 = товара в корзине нет → показываем кнопку "Добавить в корзину"
  // >0 = показываем счетчик
  const [qty, setQty] = useState(0);

  const handleAdd = () => setQty(1);
  const handlePlus = () => setQty((q) => q + 1);
  const handleMinus = () => setQty((q) => Math.max(0, q - 1)); // не уходим ниже 0

  // если qty стал 0 после минуса — вернётся кнопка "Добавить в корзину"
  return (
    <div className="goodsItemWrapper">
      <div className="goodsItemTop">
        <a href="#" className="goodsItemLink" aria-label="Открыть товар" />
        <div className="goodsItemVisual">
          <div className="goodsItemVisualTag">Popular</div>

          <div className="goodsItemVisualActions">
            <button className="goodsItemVisualActionBtn" aria-label="В корзину">
              {/* …иконка… */}
            </button>
            <button
              className="goodsItemVisualActionBtn"
              aria-label="В избранное"
            >
              {/* …иконка… */}
            </button>
          </div>

          <div className="goodsItemVisualImage">
            <img src={goods1} alt="Strell PowerSteel 35" />
          </div>
        </div>

        <div className="goodsItemName">Strell PowerSteel 35</div>
        <div className="goodsItemDesc">
          Современный котёл в металлическом корпусе
        </div>
      </div>

      <div className="goodsItemBottom">
        <div className="goodsItemPrice">
          <div className="goodsItemActualPrice">3200 AZN</div>
          <div className="goodsItemOldPrice">4800 AZN</div>
        </div>

        {/* Если qty === 0 — показываем кнопку добавления */}
        {qty === 0 ? (
          <button
            type="button"
            className="goodsItemAddToBasket mainBtn addToBasketBtn"
            onClick={handleAdd}
          >
            Добавить в корзину
          </button>
        ) : (
          // Иначе показываем счётчик
          <div className="goodsItemCounter">
            <div className="goodsItemCounterText mainBtn">В корзине</div>
            <div
              className="goodsItemCounterWrapper"
              role="group"
              aria-label="Счётчик товара"
            >
              <button
                className="goodsItemCounterPlus"
                onClick={handlePlus}
                aria-label="Увеличить"
              >
                +
              </button>
              <div className="goodsItemCounterNumber" aria-live="polite">
                {qty}
              </div>
              <button
                className="goodsItemCounterMinus"
                onClick={handleMinus}
                aria-label="Уменьшить"
              >
                –
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoodsItem;
