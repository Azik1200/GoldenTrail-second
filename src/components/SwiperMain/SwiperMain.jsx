import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

import "./SwiperMain.scss";
import styles from "./SwiperMain.module.scss";

import SwiperMainBanner from "./../../assets/img/SwiperMainBanner.png";

export default function SwiperMain() {
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
            <SwiperSlide className={styles.slide}>
              <div className="swiperInfoWrapperOuter">
                <div className="swiperInfoPhoto">
                  <img src={SwiperMainBanner} alt="SwiperMainBanner" />
                </div>
                <div className="swiperInfoWrapper">
                  <span className="swiperInfoTag">Специальное предложение</span>
                  <h2 className="swiperInfoHeader">
                    Тепло и комфорт в каждый дом
                  </h2>
                  <div className="swiperInfoDesc">
                    Современные котлы Strell со скидкой до 20%. Надёжность,
                    энергоэффективность и стильный дизайн для вашего дома.
                  </div>
                  <a href="#" className="swiperInfoLink mainBtn">
                    Заказать сейчас
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.slide}>
              <div className="swiperInfoWrapperOuter">
                <div className="swiperInfoPhoto">
                  <img src={SwiperMainBanner} alt="SwiperMainBanner" />
                </div>
                <div className="swiperInfoWrapper">
                  <span className="swiperInfoTag">Специальное предложение</span>
                  <h2 className="swiperInfoHeader">
                    Тепло и комфорт в каждый дом
                  </h2>
                  <div className="swiperInfoDesc">
                    Современные котлы Strell со скидкой до 20%. Надёжность,
                    энергоэффективность и стильный дизайн для вашего дома.
                  </div>
                  <a href="#" className="swiperInfoLink mainBtn">
                    Заказать сейчас
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className={styles.slide}>
              <div className="swiperInfoWrapperOuter">
                <div className="swiperInfoPhoto">
                  <img src={SwiperMainBanner} alt="SwiperMainBanner" />
                </div>
                <div className="swiperInfoWrapper">
                  <span className="swiperInfoTag">Специальное предложение</span>
                  <h2 className="swiperInfoHeader">
                    Тепло и комфорт в каждый дом
                  </h2>
                  <div className="swiperInfoDesc">
                    Современные котлы Strell со скидкой до 20%. Надёжность,
                    энергоэффективность и стильный дизайн для вашего дома.
                  </div>
                  <a href="#" className="swiperInfoLink mainBtn">
                    Заказать сейчас
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
