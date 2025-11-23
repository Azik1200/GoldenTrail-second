import PriceRange from "../PriceRange/PriceRange";

const FiltersBar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`filters filtersOverlay ${
        isOpen ? "filtersOverlay--open" : ""
      }`}
    >
      <div className="filterContainer">
        <div className="filtersWrapper">
          <div className="filtersWrapperTop">
            <h2 className="filersName">Все фильтры</h2>
            <button className="filtersCloseBtn" onClick={onClose}>
              <svg
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3953 19.0969L22.402 23.1144C22.4945 23.1937 22.6134 23.2352 22.7351 23.2305C22.8567 23.2258 22.9721 23.1752 23.0582 23.0889C23.1442 23.0026 23.1947 22.8869 23.1994 22.765C23.2041 22.643 23.1627 22.5238 23.0835 22.431L19.0768 18.4136L23.0883 14.3961C23.1793 14.3049 23.2305 14.1811 23.2305 14.052C23.2305 13.923 23.1793 13.7992 23.0883 13.708C22.9973 13.6167 22.8739 13.5654 22.7452 13.5654C22.6165 13.5654 22.493 13.6167 22.402 13.708L18.3953 17.7303L14.3886 13.708C14.3453 13.6572 14.2919 13.616 14.232 13.5869C14.172 13.5579 14.1067 13.5415 14.0401 13.5389C13.9736 13.5364 13.9072 13.5476 13.8452 13.572C13.7832 13.5963 13.7268 13.6333 13.6797 13.6805C13.6326 13.7277 13.5958 13.7842 13.5715 13.8464C13.5472 13.9086 13.536 13.9752 13.5385 14.0419C13.5411 14.1086 13.5574 14.1741 13.5864 14.2342C13.6154 14.2944 13.6565 14.3478 13.7071 14.3913L17.7138 18.4136L13.7071 22.431C13.6279 22.5238 13.5866 22.643 13.5913 22.765C13.596 22.8869 13.6464 23.0026 13.7325 23.0889C13.8185 23.1752 13.9339 23.2258 14.0556 23.2305C14.1772 23.2352 14.2961 23.1937 14.3886 23.1144L18.3953 19.0969Z"
                  fill="#231F20"
                />
              </svg>
            </button>
          </div>
          <div className="filersItem catalog">
            <h3 className="h3FiltersItemHeader">Раздел</h3>
            <div className="filtersGroup">
              <label className="filterItem">
                <input type="checkbox" className="filterCheckbox" />
                <span>Котлы</span>
              </label>

              <label className="filterItem">
                <input type="checkbox" className="filterCheckbox" />
                <span>Водонагреватели</span>
              </label>

              <label className="filterItem">
                <input type="checkbox" className="filterCheckbox" />
                <span>Горелки</span>
              </label>

              <label className="filterItem">
                <input type="checkbox" className="filterCheckbox" />
                <span>Солнечные и тепловые системы</span>
              </label>

              <label className="filterItem">
                <input type="checkbox" className="filterCheckbox" />
                <span>Сплит-системы и мультисплит-системы</span>
              </label>
            </div>
          </div>
          <div className="filersItem">
            <h3 className="h3FiltersItemHeader">Цена</h3>
            <div className="filersPrice">
              <PriceRange />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
