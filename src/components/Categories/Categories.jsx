import "./Categories.scss";
import useCategories from "../../hooks/useCategories";

const Categories = () => {
  const categories = useCategories();
  const visibleCategories = categories.slice(0, 3);

  return (
    <>
      <div className="categories">
        <div className="container">
          <h2 className="categoriesHeader">Категории товаров</h2>
          <div className="categoriesWrapper">
            {visibleCategories.length === 0 ? (
              <div className="categoriesItem">
                <div className="categoriesName">Категории недоступны</div>
              </div>
            ) : (
              visibleCategories.map((category) => (
                <a
                  key={category.id || category.slug}
                  href={`/catalog/${category.slug || ""}`}
                  className="categoriesItem"
                >
                  <div className="categoriesName">{category.name}</div>
                  <div className="categoriesBtn mainBtn">Перейти в каталог</div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
