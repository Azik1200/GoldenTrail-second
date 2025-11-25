import "./Advantages.scss";
import { useLanguageContext } from "../../context/LanguageContext";

const Advantages = () => {
  const { t } = useLanguageContext();

  return (
    <>
      <div className="advantages">
        <div className="container">
          <div className="advantagesHeader">{t("home.advantages.title")}</div>
          <div className="advantagesList">
            <div className="advantagesListItem">
              <div className="advantagesListItemSVG">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9687 9.45312C12.9687 16.4844 20 17.6562 20 23.5156C20 25.8594 17.6562 29.375 14.1406 29.375C10.625 29.375 8.28125 25.8594 10.625 20C7.10937 22.3438 5.9375 24.6875 5.9375 27.0312C5.9375 32.8906 11.7969 38.75 20 38.75C28.2031 38.75 34.0625 35.2344 34.0625 28.2031C34.1148 17.8027 22.0781 14.3284 18.8281 9.45312C16.4844 5.9375 17.6562 3.59375 20 1.25C15.3125 2.42188 12.9687 5.70312 12.9687 9.45312Z"
                    fill="#222222"
                  />
                </svg>
              </div>
              <div className="advantagesListItemName">
                {t("home.advantages.energyTitle")}
              </div>
              <div className="advantagesListItemDesc">
                {t("home.advantages.energyDesc")}
              </div>
            </div>
            <div className="advantagesListItem">
              <div className="advantagesListItemSVG">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9687 9.45312C12.9687 16.4844 20 17.6562 20 23.5156C20 25.8594 17.6562 29.375 14.1406 29.375C10.625 29.375 8.28125 25.8594 10.625 20C7.10937 22.3438 5.9375 24.6875 5.9375 27.0312C5.9375 32.8906 11.7969 38.75 20 38.75C28.2031 38.75 34.0625 35.2344 34.0625 28.2031C34.1148 17.8027 22.0781 14.3284 18.8281 9.45312C16.4844 5.9375 17.6562 3.59375 20 1.25C15.3125 2.42188 12.9687 5.70312 12.9687 9.45312Z"
                    fill="#222222"
                  />
                </svg>
              </div>
              <div className="advantagesListItemName">
                {t("home.advantages.reliabilityTitle")}
              </div>
              <div className="advantagesListItemDesc">
                {t("home.advantages.reliabilityDesc")}
              </div>
            </div>
            <div className="advantagesListItem">
              <div className="advantagesListItemSVG">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9687 9.45312C12.9687 16.4844 20 17.6562 20 23.5156C20 25.8594 17.6562 29.375 14.1406 29.375C10.625 29.375 8.28125 25.8594 10.625 20C7.10937 22.3438 5.9375 24.6875 5.9375 27.0312C5.9375 32.8906 11.7969 38.75 20 38.75C28.2031 38.75 34.0625 35.2344 34.0625 28.2031C34.1148 17.8027 22.0781 14.3284 18.8281 9.45312C16.4844 5.9375 17.6562 3.59375 20 1.25C15.3125 2.42188 12.9687 5.70312 12.9687 9.45312Z"
                    fill="#222222"
                  />
                </svg>
              </div>
              <div className="advantagesListItemName">
                {t("home.advantages.smartTitle")}
              </div>
              <div className="advantagesListItemDesc">
                {t("home.advantages.smartDesc")}
              </div>
            </div>
            <div className="advantagesListItem">
              <div className="advantagesListItemSVG">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9687 9.45312C12.9687 16.4844 20 17.6562 20 23.5156C20 25.8594 17.6562 29.375 14.1406 29.375C10.625 29.375 8.28125 25.8594 10.625 20C7.10937 22.3438 5.9375 24.6875 5.9375 27.0312C5.9375 32.8906 11.7969 38.75 20 38.75C28.2031 38.75 34.0625 35.2344 34.0625 28.2031C34.1148 17.8027 22.0781 14.3284 18.8281 9.45312C16.4844 5.9375 17.6562 3.59375 20 1.25C15.3125 2.42188 12.9687 5.70312 12.9687 9.45312Z"
                    fill="#222222"
                  />
                </svg>
              </div>
              <div className="advantagesListItemName">
                {t("home.advantages.serviceTitle")}
              </div>
              <div className="advantagesListItemDesc">
                {t("home.advantages.serviceDesc")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advantages;
