import "./CatalogItems.scss";
import products from "../../tools/Products";
import GoodsItem from "../GoodsItem/GoodsItem";

// import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import FiltersBar from "./../FiltersBar/FiltersBar";
import { useState } from "react";

const CatalogItems = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <>
      <div className="catalog">
        <div className="container">
          <div className="breadcrumps">
            <a href="/" className="breadcrumpLink">
              Главная
            </a>{" "}
            /{" "}
            <a href="#" className="breadcrumpLink">
              Имя чаптера
            </a>{" "}
            {/* тут должно быть имя категории если пользователь нажимает сразу на имя категории в хедере */}
            {/* /{" "}
            <a href="#" className="breadcrumpLink">
              category.name
            </a> */}
          </div>
          <h1 className="catalogName">Отопление</h1>
          {/* появляется если пользователь нажимает на категорию а не на чаптер */}
          <h3 className="categoryName">Котлы</h3>
          <button className="filtersBtn" onClick={() => setIsFiltersOpen(true)}>
            <p>Все фильтры</p>
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.37476 14.08L9.9186 17.8366C10.0176 17.9406 10.1511 17.9993 10.2905 17.9999C10.3619 18.0013 10.4326 17.9859 10.4977 17.9549C10.5938 17.9117 10.6757 17.8396 10.7333 17.7475C10.791 17.6553 10.8217 17.5473 10.8218 17.4367V7.36667L16.8469 0.963074C16.9206 0.883875 16.9705 0.783302 16.9904 0.674047C17.0103 0.564792 16.9991 0.45175 16.9585 0.349185C16.9186 0.246334 16.8509 0.15829 16.7639 0.0961504C16.6769 0.0340105 16.5745 0.000555025 16.4697 0L0.530347 0C0.425453 0.000555025 0.32306 0.0340105 0.236074 0.0961504C0.149088 0.15829 0.0814002 0.246334 0.0415412 0.349185C0.000853765 0.45175 -0.0102627 0.564792 0.00959459 0.674047C0.0294518 0.783302 0.079393 0.883875 0.153116 0.963074L6.19943 7.36667V13.7027C6.2097 13.8478 6.27253 13.983 6.37476 14.08ZM1.8108 1.1264H15.1892L9.87609 6.75842C9.82589 6.81058 9.78595 6.87278 9.75859 6.94142C9.73123 7.01006 9.71699 7.08377 9.7167 7.15829V16.1019L7.2408 13.4718V7.13576C7.2405 7.06125 7.22626 6.98753 7.1989 6.91889C7.17154 6.85025 7.1316 6.78805 7.0814 6.73589L1.8108 1.1264Z"
                fill="#12202D"
              />
            </svg>
          </button>

          <FiltersBar
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
          />

          <ul className="catalogList">
            {products.map((p) => (
              <GoodsItem key={p.id} product={p} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CatalogItems;
