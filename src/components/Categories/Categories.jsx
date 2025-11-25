import "./Categories.scss";
import useCategories from "../../hooks/useCategories";
import useLanguage from "../../hooks/useLanguage";

const Categories = () => {
  const categories = useCategories();
  const visibleCategories = categories.slice(0, 3);
  const { t } = useLanguage();

  return (
    <>
      <div className="categories">
        <div className="container">
          <h2 className="categoriesHeader">{t("categories.title")}</h2>
          <div className="categoriesWrapper">
            {visibleCategories.length === 0 ? (
              <div className="categoriesItem">
                <div className="categoriesName">{t("categories.empty")}</div>
              </div>
            ) : (
              visibleCategories.map((category) => (
                <a
                  key={category.id || category.slug}
                  href={`/catalog/${category.slug || ""}`}
                  className="categoriesItem"
                >
                  <div className="categoriesName">{category.name}</div>
                  <div className="categoriesBtn mainBtn">{t("categories.cta")}</div>
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
