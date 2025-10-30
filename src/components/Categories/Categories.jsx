import "./Categories.scss";

const Categories = () => {
  return (
    <>
      <div className="categories">
        <div className="container">
          <h2 className="categoriesHeader">Категории товаров</h2>
          <div className="categoriesWrapper">
            <a href="#" className="categoriesItem">
              <div className="categoriesName">Отопление</div>
              <div className="categoriesBtn mainBtn">Перейти в каталог</div>
            </a>
            <a href="#" className="categoriesItem">
              <div className="categoriesName">
                Возобновляемые источники энергии
              </div>
              <div className="categoriesBtn mainBtn">Перейти в каталог</div>
            </a>
            <a href="#" className="categoriesItem">
              <div className="categoriesName">Климатизация</div>
              <div className="categoriesBtn mainBtn">Перейти в каталог</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
