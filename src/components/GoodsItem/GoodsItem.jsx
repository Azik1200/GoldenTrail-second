// src/components/GoodsItem/GoodsItem.jsx
import React, { useState } from "react";
import "./GoodsItem.scss";
import { Link } from "react-router-dom";
import { addOrUpdateCartItem } from "../../api/cart";
import { addFavorite } from "../../api/favorites";
import useLanguage from "../../hooks/useLanguage";
import { formatProductImageUrl } from "../../api/products";

const formatPrice = (value) =>
  typeof value === "number" ? `${value.toFixed(2)} AZN` : value || "";

const computePrices = (product) => {
  const price = typeof product.price === "number" ? product.price : null;
  const discount =
    typeof product.discount === "number" && product.discount > 0
      ? product.discount
      : null;

  const discounted =
    price && discount ? price * (1 - discount / 100) : price ?? null;

  return {
    actualPrice: formatPrice(product.actualPrice ?? discounted),
    oldPrice:
      product.oldPrice ||
      (discount && price ? formatPrice(price) : product.oldPrice ?? ""),
  };
};

const GoodsItem = ({ product }) => {
  const [qty, setQty] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const { t } = useLanguage();

  if (!product) {
    console.warn("GoodsItem: проп 'product' не передан");
    return null;
  }

  const { actualPrice, oldPrice } = computePrices(product);
  const displayTag = product.goodsTag || (product.is_new ? "New" : "");
  const displayName = product.name || product.title || product.sku || "";
  const displayDesc = product.desc || product.sku || "";
  const displayImage = formatProductImageUrl(
    product.image ||
      product.img ||
      product.images?.[0]?.url ||
      product.images?.[0]?.image ||
      product.images?.[0]?.path
  );
  const id = product.id;

  const updateQuantity = async (nextQty) => {
    if (!id || nextQty < 1) return;

    setIsUpdating(true);

    try {
      const response = await addOrUpdateCartItem({
        productId: id,
        quantity: nextQty,
        price: product.price,
      });

      setQty(response?.item?.quantity ?? nextQty);
    } catch (error) {
      console.error("Не удалось обновить корзину", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAdd = () => updateQuantity(1);
  const handlePlus = () => updateQuantity(qty + 1);
  const handleMinus = () => {
    if (qty <= 1) return;
    updateQuantity(qty - 1);
  };

  const handleFavorite = async () => {
    if (!id) return;

    setIsFavoriting(true);

    try {
      await addFavorite(id);
    } catch (error) {
      console.error("Не удалось добавить в избранное", error);
    } finally {
      setIsFavoriting(false);
    }
  };

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
          {displayTag && <div className="goodsItemVisualTag">{displayTag}</div>}

          <div className="goodsItemVisualActions">
            <button
              className="goodsItemVisualActionBtn"
              aria-label="В корзину"
            />
            <button
              className="goodsItemVisualActionBtn"
              aria-label="В избранное"
              onClick={handleFavorite}
              disabled={isFavoriting}
            />
          </div>

          <div className="goodsItemVisualImage">
            <img src={displayImage} alt={displayName} />
          </div>
        </div>

        <div className="goodsItemName">{displayName}</div>
        <div className="goodsItemDesc">{displayDesc}</div>
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
            disabled={isUpdating}
          >
            {t("goods.addToCart")}
          </button>
        ) : (
          <div className="goodsItemCounter">
            <div className="goodsItemCounterText mainBtn">
              {t("goods.inCart")}
            </div>
            <div
              className="goodsItemCounterWrapper"
              role="group"
              aria-label="Счётчик товара"
            >
              <button
                className="goodsItemCounterPlus"
                onClick={handlePlus}
                aria-label="Увеличить"
                disabled={isUpdating}
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
                disabled={isUpdating}
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
