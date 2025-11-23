// src/components/GoodsItem/GoodsItem.jsx
import React, { useState } from "react";
import "./GoodsItem.scss";
import { Link } from "react-router-dom";

const GoodsItem = ({ product }) => {
  const [qty, setQty] = useState(0);

  if (!product) {
    console.warn("GoodsItem: проп 'product' не передан");
    return null;
  }

  const { id, goodsTag, img, name, desc, actualPrice, oldPrice } = product;

  const handleAdd = () => setQty(1);
  const handlePlus = () => setQty((q) => q + 1);
  const handleMinus = () => setQty((q) => Math.max(0, q - 1));

  return (
    <div className="goodsItemWrapper">
      <div className="goodsItemTop">
        {/* вместо <a href="#"> — Link, чтобы не перезагружать страницу */}
        <Link
          to={`/product/${id}`}
          className="goodsItemLink"
          aria-label="Открыть товар"
        />
        <div className="goodsItemVisual">
          {goodsTag && <div className="goodsItemVisualTag">{goodsTag}</div>}

          <div className="goodsItemVisualActions">
            <button
              className="goodsItemVisualActionBtn"
              aria-label="В корзину"
            />
            <button
              className="goodsItemVisualActionBtn"
              aria-label="В избранное"
            />
          </div>

          <div className="goodsItemVisualImage">
            <img src={img} alt={name} />
          </div>
        </div>

        <div className="goodsItemName">{name}</div>
        <div className="goodsItemDesc">{desc}</div>
      </div>

      <div className="goodsItemBottom">
        <div className="goodsItemPrice">
          <div className="goodsItemActualPrice">{actualPrice}</div>
          {oldPrice && <div className="goodsItemOldPrice">{oldPrice}</div>}
        </div>

        {qty === 0 ? (
          <button
            type="button"
            className="goodsItemAddToBasket mainBtn addToBasketBtn"
            onClick={handleAdd}
          >
            Добавить в корзину
          </button>
        ) : (
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
