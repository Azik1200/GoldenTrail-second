import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import useSlides from "../../hooks/useSlides";
import { formatSlideImageUrl } from "../../api/slides";
import useLanguage from "../../hooks/useLanguage";

import "./SwiperMain.scss";
import styles from "./SwiperMain.module.scss";

export default function SwiperMain() {
  const slides = useSlides();
  const { t } = useLanguage();

  if (!slides.length) {
    return null;
  }

  return (
    <>
      <div className="mainSwiper">
        <div className="container">
          <Swiper
            className={styles.mySwiper}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className={styles.slide}>
                <div className="swiperInfoWrapperOuter">
                  <div className="swiperInfoPhoto">
                    <img
                      src={formatSlideImageUrl(slide.image)}
                      alt={slide.big_text || "Slide"}
                    />
                  </div>
                  <div className="swiperInfoWrapper">
                    {slide.small_text && (
                      <span className="swiperInfoTag">{slide.small_text}</span>
                    )}
                    {slide.big_text && (
                      <h2 className="swiperInfoHeader">{slide.big_text}</h2>
                    )}
                    {slide.medium_text && (
                      <div className="swiperInfoDesc">{slide.medium_text}</div>
                    )}
                    <a href="#" className="swiperInfoLink mainBtn">
                      {t("home.slider.orderNow")}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
