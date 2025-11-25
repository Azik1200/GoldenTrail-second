import "./Warranty.scss";
import { useLanguageContext } from "../../context/LanguageContext";

const Warranty = () => {
  const { t } = useLanguageContext();

  const title = t("home.warranty.title");
  const description = t("home.warranty.description");
  const monthsValue = t("home.warranty.monthsValue");
  const monthsLabel = t("home.warranty.monthsLabel");

  return (
    <>
      <div className="warranty">
        <div className="container">
          <div className="warrantyWrapper">
            <div className="warrantyText">
              <h2 className="warrantyHeader">{title}</h2>
              <div className="warrantyDesc">{description}</div>
            </div>
            <div className="warrantyTime">
              <div className="warrantyTimeNumber">{monthsValue}</div>
              <div className="warrantyTimeText">{monthsLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Warranty;
