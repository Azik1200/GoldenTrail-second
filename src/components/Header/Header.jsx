import { useEffect, useMemo, useState } from "react";
import logo from "./../../assets/img/Logo.svg";
import searchResult1 from "./../../assets/img/searchResult1.png";
import searchResult2 from "./../../assets/img/searchResult2.png";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import useLoading from "../../hooks/useLoading";
import useCategories from "../../hooks/useCategories";

const Header = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { triggerManualLoading } = useLoading();
  const categories = useCategories();

  const fallbackCategories = useMemo(
    () => [
      {
        id: "chapter-1",
        name: t("navigation.heating"),
        children: [
          { id: "category-1", name: t("navigation.boilers") },
          { id: "category-2", name: t("navigation.waterHeaters") },
          { id: "category-3", name: t("navigation.burners") },
        ],
      },
      {
        id: "chapter-2",
        name: t("navigation.renewables"),
        children: [{ id: "category-4", name: t("navigation.solar") }],
      },
      {
        id: "chapter-3",
        name: t("navigation.climate"),
        children: [{ id: "category-5", name: t("navigation.splits") }],
      },
    ],
    [t]
  );

  const chapters = categories.length ? categories : fallbackCategories;

  useEffect(() => {
    if (!chapters.length) return;

    setActiveTab((prev) => {
      if (prev && chapters.some((chapter) => chapter.id === prev)) return prev;
      return chapters[0].id;
    });
  }, [chapters]);

  const activeChapter = chapters.find((chapter) => chapter.id === activeTab);

  useEffect(() => {
    const body = document.body;
    const dropdown = document.querySelector(".headerDropdownDesktop");

    if (isHovered) {
      body.classList.add("active");
      dropdown?.classList.add("opened");
    } else {
      body.classList.remove("active");
      dropdown?.classList.remove("opened");
    }
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleLanguageChange = async (lang) => {
    if (lang === language) return;
    await triggerManualLoading();
    setLanguage(lang);
  };

  useEffect(() => {
    const burger = document.getElementById("burgerID");
    const body = document.body;
    const dropdownMobile = document.querySelector(".headerDropdownMobile");
    const mobileAccordionBtn = document.querySelector(
      ".headerDropdownMobile_item_main-btn"
    );
    const accordionContent = document.querySelector(
      ".headerDropdownMobile_item_content"
    );
    const contentBtns = document.querySelectorAll(
      ".headerDropdownMobile_item_content_btn"
    );
    const secondWrappers = document.querySelectorAll(
      ".headerDropdownMobile_wrapper_second-inner"
    );
    const backBtns = document.querySelectorAll("#headerGOBACK");

    const toggleBurger = () => {
      burger.classList.toggle("burgerOPEN");
      dropdownMobile.classList.toggle("active");
      dropdownMobile.classList.remove("second-view");
      dropdownMobile.classList.add("main-view");
      body.classList.toggle("active");
    };

    const closeBurger = (e) => {
      if (e.target.classList.contains("burgerOPEN")) {
        burger.classList.remove("burgerOPEN");
        dropdownMobile.classList.remove("active", "main-view", "second-view");
        body.classList.remove("active");
      }
    };

    const toggleAccordion = () => {
      accordionContent.classList.toggle("open");
    };

    const openSecondView = (id) => {
      secondWrappers.forEach((el) => {
        el.style.display = el.getAttribute("data-id") === id ? "block" : "none";
      });
      dropdownMobile.classList.remove("main-view");
      dropdownMobile.classList.add("second-view");
    };

    const backToMain = () => {
      dropdownMobile.classList.remove("second-view");
      dropdownMobile.classList.add("main-view");
    };

    burger?.addEventListener("click", toggleBurger);
    document.addEventListener("click", closeBurger);
    mobileAccordionBtn?.addEventListener("click", toggleAccordion);
    contentBtns.forEach((btn) => {
      btn.addEventListener("click", () => openSecondView(btn.id));
    });
    backBtns.forEach((btn) => {
      btn.addEventListener("click", backToMain);
    });

    return () => {
      burger?.removeEventListener("click", toggleBurger);
      document.removeEventListener("click", closeBurger);
      mobileAccordionBtn?.removeEventListener("click", toggleAccordion);
      contentBtns.forEach((btn) => {
        btn.removeEventListener("click", () => openSecondView(btn.id));
      });
      backBtns.forEach((btn) => {
        btn.removeEventListener("click", backToMain);
      });
    };
  }, []);

  return (
    <>
      <div className="headerMain">
        <div className="headerNew">
          <div className="container">
            <div className="headerNew_wrapper">
              <NavLink to="/" className="headerNew_logo">
                <img src={logo} alt="GoldenTrail" />
              </NavLink>
              <div className="headerNew_nav">
                <button
                  className="headerNew_nav_btn"
                  id="headerNewProduction"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t("header.production")}
                </button>
                <a href="#" className="headerNew_nav_btn">
                  {t("header.about")}
                </a>
                <button className="headerNew_nav_btn">{t("header.contacts")}</button>
              </div>
              <div className="headerNew_functions">
                <button
                  className="headerNew_functions_btn"
                  id="openSearchPanelDesctop"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4546 15.4546L19.0909 19.0909M2.72729 10C2.72729 11.9289 3.49353 13.7787 4.85743 15.1426C6.22133 16.5065 8.07118 17.2728 10 17.2728C11.9289 17.2728 13.7787 16.5065 15.1426 15.1426C16.5065 13.7787 17.2728 11.9289 17.2728 10C17.2728 8.07118 16.5065 6.22133 15.1426 4.85743C13.7787 3.49353 11.9289 2.72729 10 2.72729C8.07118 2.72729 6.22133 3.49353 4.85743 4.85743C3.49353 6.22133 2.72729 8.07118 2.72729 10Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <NavLink to="/favorites" className="headerNew_functions_btn">
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
                </NavLink>
                <NavLink
                  to="/basket"
                  href="#"
                  className="headerNew_functions_btn"
                >
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
                </NavLink>
              </div>
              <div className="headerNew_right">
                <div className="headerNew_languages">
                  {["az", "ru", "en"].map((lang) => (
                    <button
                      key={lang}
                      className={`headerNew_languages_btn ${
                        language === lang ? "active" : ""
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button className="headerNew_right_burger" id="burgerID">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="headerDropdownDesktop"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container">
            <div className="headerDropdownDesktop_wrapper">
              <div className="headerDropdownDesktop_chapter">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={`headerDropdownDesktop_chapter_item ${
                      activeTab === chapter.id ? "active" : ""
                    }`}
                    id={chapter.id}
                    onClick={() => setActiveTab(chapter.id)}
                  >
                    {chapter.name}
                  </div>
                ))}
              </div>

              <div className="headerDropdownDesktop_categories">
                {activeChapter?.children?.length ? (
                  <ul className="headerDropdownDesktop_categories_list">
                    {activeChapter.children.map((catalog) => (
                      <li
                        key={catalog.id || catalog.slug || catalog.name}
                        className="headerDropdownDesktop_categories_item"
                      >
                        <NavLink
                          to={`/catalog?catalog=${catalog.slug || catalog.id || ""}`}
                        >
                          {catalog.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="headerDropdownMobile">
          <div className="container">
              <div className="headerDropdownMobile_wrapper_main">
                <div className="headerDropdownMobile_item">
                  <div className="headerDropdownMobile_item_main-btn production">
                    {t("header.production")}
                  </div>
                  <div className="headerDropdownMobile_item_content">
                    <div
                      className="headerDropdownMobile_item_content_btn"
                      id="chapter-mob-1"
                    >
                      {t("navigation.heating")}
                    </div>
                    <div
                      className="headerDropdownMobile_item_content_btn"
                      id="chapter-mob-2"
                    >
                      {t("navigation.renewables")}
                    </div>
                    <div
                      className="headerDropdownMobile_item_content_btn"
                      id="chapter-mob-3"
                    >
                      {t("navigation.climate")}
                    </div>
                  </div>
                </div>
                <div className="headerDropdownMobile_item">{t("header.about")}</div>
                <div className="headerDropdownMobile_item">{t("header.contacts")}</div>
              </div>
              <div className="headerDropdownMobile_wrapper_second">
                <div
                  className="headerDropdownMobile_wrapper_second-inner"
                  data-id="chapter-mob-1"
                >
                  <button
                    className="headerDropdownMobile_wrapper_second-back"
                    id="headerGOBACK"
                  >
                    {t("navigation.back")}
                  </button>
                  <div className="headerDropdownMobile_wrapper_second-inner-innerest">
                    <div className="headerDropdownMobile_wrapper_second-inner_name">
                      {t("navigation.heating")}
                    </div>
                    <ul className="headerDropdownMobile_wrapper_second-inner-list">
                      <li className="headerDropdownMobile_wrapper_second-inner-list-item">
                        <a href="#">{t("navigation.boilers")}</a>
                      </li>
                      <li className="headerDropdownMobile_wrapper_second-inner-list-item">
                        <a href="#">{t("navigation.waterHeaters")}</a>
                      </li>
                      <li className="headerDropdownMobile_wrapper_second-inner-list-item">
                        <a href="#">{t("navigation.burners")}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="headerDropdownMobile_wrapper_second-inner"
                  data-id="chapter-mob-2"
                >
                  <button
                    className="headerDropdownMobile_wrapper_second-back"
                    id="headerGOBACK"
                  >
                    {t("navigation.back")}
                  </button>
                  <div className="headerDropdownMobile_wrapper_second-inner-innerest">
                    <div className="headerDropdownMobile_wrapper_second-inner_name">
                      {t("navigation.renewables")}
                    </div>
                    <ul className="headerDropdownMobile_wrapper_second-inner-list">
                      <li className="headerDropdownMobile_wrapper_second-inner-list-item">
                        <a href="#">{t("navigation.solar")}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="headerDropdownMobile_wrapper_second-inner"
                  data-id="chapter-mob-3"
                >
                  <button
                    className="headerDropdownMobile_wrapper_second-back"
                    id="headerGOBACK"
                  >
                    {t("navigation.back")}
                  </button>
                  <div className="headerDropdownMobile_wrapper_second-inner-innerest">
                    <div className="headerDropdownMobile_wrapper_second-inner_name">
                      {t("navigation.climate")}
                    </div>
                    <ul className="headerDropdownMobile_wrapper_second-inner-list">
                      <li className="headerDropdownMobile_wrapper_second-inner-list-item">
                        <a href="#">{t("navigation.splits")}</a>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className="headerSearch">
          <div className="container">
            <div className="headerWrapper">
              <form action="#" id="headerNewFormSearch">
                <input
                  type="text"
                  className="headerNewSearchInput"
                  placeholder={t("header.searchPlaceholder")}
                />
              </form>
              <button className="headerNewCloseBtn">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <div className="headerResults">
            <div className="container">
              <div className="headerResultsWrapper">
                <div className="headerResultsPlus">
                  <ul className="headerResultsList">
                    <li className="headerResultsListItem">
                      <a href="#">
                        <div className="headerResultsListItem_wrapper">
                          <div className="headerResultsListItem_img">
                            <img src={searchResult1} alt="searchResult1" />
                          </div>
                          <div className="headerResultsListItem_wrapper-inner">
                            <div className="headerResultsListItem_name">
                              {t("navigation.sampleApron")}
                            </div>
                            <div className="headerResultsListItem_price">
                              <div className="headerResultsListItem_price-actual">
                                7 800 ₼
                              </div>
                              <div className="headerResultsListItem_price-old">
                                11 300 ₼
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="headerResultsListItem">
                      <a href="#">
                        <div className="headerResultsListItem_wrapper">
                          <div className="headerResultsListItem_img">
                            <img src={searchResult2} alt="searchResult2" />
                          </div>
                          <div className="headerResultsListItem_wrapper-inner">
                            <div className="headerResultsListItem_name">
                              {t("navigation.sampleGlasses")}
                            </div>
                            <div className="headerResultsListItem_price">
                              <div className="headerResultsListItem_price-actual">
                                4 200 ₼
                              </div>
                              <div className="headerResultsListItem_price-old"></div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="headerResultsMinus">
                  <p className="headerNewSearchResultsMinus">{t("navigation.searchEmpty")}</p>
                </div>
                <div className="headerResultsStory">
                  <ul className="headerResultsStoryList">
                    <li className="headerResultsStoryListItem">
                      <div className="headerResultsStoryListItemName">
                        {t("navigation.storyOne")}
                      </div>
                      <button className="headerResultsStoryListItemBtn">{t("common.delete")}</button>
                    </li>
                    <li className="headerResultsStoryListItem">
                      <div className="headerResultsStoryListItemName">Защи</div>
                      <button className="headerResultsStoryListItemBtn">{t("common.delete")}</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="headerFunctionsMobile">
        <div className="container">
          <div className="headerFunctionsMobileWrapper">
            <button
              className="headerNew_functions_btn"
              id="openSearchPanelMobile"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4546 15.4546L19.0909 19.0909M2.72729 10C2.72729 11.9289 3.49353 13.7787 4.85743 15.1426C6.22133 16.5065 8.07118 17.2728 10 17.2728C11.9289 17.2728 13.7787 16.5065 15.1426 15.1426C16.5065 13.7787 17.2728 11.9289 17.2728 10C17.2728 8.07118 16.5065 6.22133 15.1426 4.85743C13.7787 3.49353 11.9289 2.72729 10 2.72729C8.07118 2.72729 6.22133 3.49353 4.85743 4.85743C3.49353 6.22133 2.72729 8.07118 2.72729 10Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <NavLink to="/favorites" className="headerNew_functions_btn">
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
            </NavLink>
            <NavLink to="/basket" className="headerNew_functions_btn">
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
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
