const CategoriesForEmtyBasketAndFav = () => {
  return (
    <>
      <div className="categories">
        <div className="categoriesWrapper">
          <a href="#" className="categoriesItem">
            <div className="categoriesName">Отопление</div>
            <div className="categoriesBtnBasketFav mainBtn">
              Перейти в каталог
            </div>
          </a>
          <a href="#" className="categoriesItem">
            <div className="categoriesName">
              Возобновляемые источники энергии
            </div>
            <div className="categoriesBtnBasketFav mainBtn">
              Перейти в каталог
            </div>
          </a>
          <a href="#" className="categoriesItem">
            <div className="categoriesName">Климатизация</div>
            <div className="categoriesBtnBasketFav mainBtn">
              Перейти в каталог
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default CategoriesForEmtyBasketAndFav;
