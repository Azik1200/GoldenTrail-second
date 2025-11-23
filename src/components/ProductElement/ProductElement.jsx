import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";

import { Navigation } from "swiper/modules";

import img1 from "./../../assets/img/goods/1.png";

import "./ProductElement.scss";

import products from "./../../tools/Products";

const ProductElement = () => {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return <div className="container">Товар не найден</div>;
  }
  return (
    <>
      <div className="product">
        <div className="container">
          <div className="breadcrumps">
            <a href="/" className="breadcrumpLink">
              Главная
            </a>{" "}
            /{" "}
            <a href="#" className="breadcrumpLink">
              Имя чаптера
            </a>{" "}
            /{" "}
            <a href="#" className="breadcrumpLink">
              {product.name}
            </a>
          </div>

          <div className="productWrapper">
            <div className="productSlider">
              {product.goodsTag && (
                <div className="productTag">{product.goodsTag}</div>
              )}

              <Swiper
                navigation={{
                  nextEl: ".product-next",
                  prevEl: ".product-prev",
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {product.numberOfImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="sliderImg"
                      src={image}
                      alt={`image-${index}`}
                    />
                  </SwiperSlide>
                ))}

                <div className="swiper-button-prev product-prev"></div>
                <div className="swiper-button-next product-next"></div>
              </Swiper>
            </div>
            <div className="productInfo">
              <div className="productInfoTop">
                <h1 className="productName">{product.name}</h1>
                <div className="productMiniDesc">{product.desc}</div>
                <div className="productMiniInfo">
                  <div className="productInStock">
                    {product.isInStock ? (
                      <div className="productInStokYes">
                        <span></span> В наличии
                      </div>
                    ) : (
                      <div className="productInStokNo">
                        <span></span> Нет в наличии
                      </div>
                    )}
                  </div>
                  <div className="productWarranty">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.1875 0.4375L3.0625 7.4375L0.4375 4.8125"
                        stroke="#231F20"
                        strokeWidth="0.875"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Гарантия 2 года
                  </div>
                </div>
                <div className="productMaxInfo">{product.deskMax}</div>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoBottomTop">
                  <div className="productInfoPrice">
                    <div className="productInfoActualPrice">
                      {product.actualPrice}
                    </div>
                    <div className="productInfoOldPrice">
                      {product.oldPrice}
                    </div>
                  </div>
                  <div className="productInfoCount">
                    <div className="productInfoCountText">Количество</div>
                    <div className="productInfoCounter">
                      <button className="productInfoMinus">-</button>
                      <div className="productInfoBtn">1</div>
                      <button className="productInfoPlus">-</button>
                    </div>
                  </div>
                </div>
                <div className="productInfoPurchase">
                  <button className="mainBtn btn1clickBtn">
                    Купить в 1 клик
                  </button>
                  <button className="pirchaseBtn mainBtn">
                    <svg
                      width="21"
                      height="22"
                      viewBox="0 0 21 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.2864 3.47729C16.5056 3.47729 18.2991 5.29843 18.2991 7.72729C18.2991 9.20607 17.6703 10.6051 16.428 12.2009C15.1765 13.8085 13.3727 15.5297 11.1292 17.6658L11.1282 17.6667L10.3899 18.3708L9.65356 17.6667L9.65259 17.6658L8.05396 16.1365C6.54166 14.6759 5.29231 13.4066 4.35376 12.2009C3.11147 10.6051 2.48267 9.20607 2.48267 7.72729C2.48267 5.2985 4.27521 3.4774 6.49438 3.47729C7.76009 3.47729 8.99836 4.09996 9.80981 5.09253L10.3909 5.80347L10.9709 5.09253C11.7823 4.09991 13.0207 3.47743 14.2864 3.47729Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                  <button className="pirchaseBtn mainBtn">
                    <svg
                      width="21"
                      height="22"
                      viewBox="0 0 21 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.4415 18.4091C8.4415 18.6788 8.36533 18.9425 8.22263 19.1667C8.07993 19.391 7.8771 19.5657 7.63979 19.6689C7.40248 19.7722 7.14136 19.7992 6.88943 19.7465C6.63751 19.6939 6.4061 19.5641 6.22448 19.3733C6.04285 19.1826 5.91916 18.9397 5.86905 18.6751C5.81894 18.4106 5.84466 18.1364 5.94295 17.8873C6.04125 17.6381 6.20771 17.4251 6.42128 17.2753C6.63485 17.1255 6.88594 17.0455 7.1428 17.0455C7.48724 17.0455 7.81756 17.1891 8.06112 17.4449C8.30467 17.7006 8.4415 18.0475 8.4415 18.4091ZM15.5844 17.0455C15.3275 17.0455 15.0764 17.1255 14.8628 17.2753C14.6493 17.4251 14.4828 17.6381 14.3845 17.8873C14.2862 18.1364 14.2605 18.4106 14.3106 18.6751C14.3607 18.9397 14.4844 19.1826 14.666 19.3733C14.8477 19.5641 15.0791 19.6939 15.331 19.7465C15.5829 19.7992 15.844 19.7722 16.0813 19.6689C16.3187 19.5657 16.5215 19.391 16.6642 19.1667C16.8069 18.9425 16.8831 18.6788 16.8831 18.4091C16.8831 18.0475 16.7462 17.7006 16.5027 17.4449C16.2591 17.1891 15.9288 17.0455 15.5844 17.0455ZM19.4569 6.31877L17.3758 14.1835C17.2613 14.6132 17.0166 14.9919 16.6787 15.2623C16.3407 15.5327 15.928 15.68 15.5032 15.6818H7.48046C7.05435 15.6816 6.64 15.5351 6.30059 15.2646C5.96118 14.9941 5.71535 14.6144 5.60059 14.1835L2.75319 3.40911H1.29864C1.12642 3.40911 0.961259 3.33727 0.839482 3.20941C0.717705 3.08154 0.649292 2.90812 0.649292 2.72729C0.649292 2.54646 0.717705 2.37304 0.839482 2.24517C0.961259 2.11731 1.12642 2.04547 1.29864 2.04547H3.24669C3.38866 2.04544 3.52672 2.09427 3.63975 2.18447C3.75277 2.27466 3.83453 2.40127 3.87251 2.5449L4.64199 5.45456H18.8311C18.9312 5.45454 19.03 5.47882 19.1197 5.52551C19.2094 5.5722 19.2875 5.64003 19.3481 5.7237C19.4087 5.80737 19.4501 5.90462 19.4689 6.00785C19.4878 6.11108 19.4837 6.21749 19.4569 6.31877ZM17.9764 6.8182H5.00319L6.85465 13.8188C6.89262 13.9624 6.97438 14.089 7.08741 14.1792C7.20043 14.2694 7.3385 14.3182 7.48046 14.3182H15.5032C15.6452 14.3182 15.7832 14.2694 15.8962 14.1792C16.0093 14.089 16.091 13.9624 16.129 13.8188L17.9764 6.8182Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="productFullDesc">
            <h2 className="productFullDescHeader">
              Технические характеристики
            </h2>
            <div className="productFullDescWrapper">
              <div className="productFullDescWrapperItem">
                <div className="productFullDescWrapperItemTitle">
                  Основные параметры:
                </div>
                <ul className="productFullDescWrapperItemList">
                  {product.technikalMeasuses.mainParameters.type && (
                    <div className="productFullDescWrapperItemListItem">
                      Тип:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.mainParameters.type}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.mainParameters.power && (
                    <div className="productFullDescWrapperItemListItem">
                      Мощность:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.mainParameters.power}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.mainParameters.efficiency && (
                    <div className="productFullDescWrapperItemListItem">
                      КПД:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.mainParameters.efficiency}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.mainParameters.displacement && (
                    <div className="productFullDescWrapperItemListItem">
                      Водоизмещение:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.mainParameters.displacement}
                      </span>
                    </div>
                  )}
                </ul>
              </div>
              <div className="productFullDescWrapperItem">
                <div className="productFullDescWrapperItemTitle">
                  Электропитание:
                </div>
                <ul className="productFullDescWrapperItemList">
                  {product.technikalMeasuses.powerSupply.voltage && (
                    <div className="productFullDescWrapperItemListItem">
                      Напряжение:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.powerSupply.voltage}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.powerSupply.frequency && (
                    <div className="productFullDescWrapperItemListItem">
                      Частота:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.powerSupply.frequency}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.powerSupply.powerConsumption && (
                    <div className="productFullDescWrapperItemListItem">
                      Потребляемая мощность:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.powerSupply.powerConsumption}
                      </span>
                    </div>
                  )}
                </ul>
              </div>
              <div className="productFullDescWrapperItem">
                <div className="productFullDescWrapperItemTitle">
                  Габариты и вес:
                </div>
                <ul className="productFullDescWrapperItemList">
                  {product.technikalMeasuses.dimensionsAndWeight.height && (
                    <div className="productFullDescWrapperItemListItem">
                      Высота:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.dimensionsAndWeight.height}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.dimensionsAndWeight.width && (
                    <div className="productFullDescWrapperItemListItem">
                      Ширина:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.dimensionsAndWeight.width}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.dimensionsAndWeight.depth && (
                    <div className="productFullDescWrapperItemListItem">
                      Глубина:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.dimensionsAndWeight.depth}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.dimensionsAndWeight.depth && (
                    <div className="productFullDescWrapperItemListItem">
                      Вес:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.dimensionsAndWeight.weight}
                      </span>
                    </div>
                  )}
                </ul>
              </div>
              <div className="productFullDescWrapperItem">
                <div className="productFullDescWrapperItemTitle">
                  Дополнительно:
                </div>
                <ul className="productFullDescWrapperItemList">
                  {product.technikalMeasuses.additional.bodyMaterial && (
                    <div className="productFullDescWrapperItemListItem">
                      Материал корпуса:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.additional.bodyMaterial}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.additional.controlSystem && (
                    <div className="productFullDescWrapperItemListItem">
                      Система управления:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.additional.controlSystem}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.additional.noiseLevel && (
                    <div className="productFullDescWrapperItemListItem">
                      Уровень шума:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {" "}
                        {product.technikalMeasuses.additional.noiseLevel}
                      </span>
                    </div>
                  )}
                  {product.technikalMeasuses.additional.warranty && (
                    <div className="productFullDescWrapperItemListItem">
                      Гарантия:{" "}
                      <span className="productFullDescWrapperItemListItemMeaning">
                        {product.technikalMeasuses.additional.warranty}
                      </span>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductElement;
