import "./About.scss";
import AboutImg from "./../../assets/img/AboutImg.png";
import useAbout from "../../hooks/useAbout";
import { useLanguageContext } from "../../context/LanguageContext";

const defaultText = [
  "Мы являемся официальным дистрибьютором продукции Ferroli в Азербайджане — итальянского производителя с более чем 65-летним опытом в сфере отопления, водонагрева и климатических решений.",
  "Наша миссия — предлагать клиентам современное, энергоэффективное и надёжное оборудование, которое соответствует европейским стандартам качества и дарит комфорт в каждый дом.",
  "Ferroli — это инновации, долговечность и стиль, а мы — ваш надёжный партнёр на пути к комфорту и теплу.",
];

const About = () => {
  const about = useAbout();
  const { t } = useLanguageContext();
  const text = about?.text || "";
  const image = about?.image || AboutImg;
  const translatedParagraphs = t("home.about.defaultParagraphs");
  const fallbackParagraphs = Array.isArray(translatedParagraphs)
    ? translatedParagraphs
    : defaultText;

  return (
    <>
      <div className="about">
        <div className="container">
          <h2 className="aboutHeader">{t("home.about.title")}</h2>
          <div className="aboutWrapper">
            <div className="aboutText">
              {text
                ? text.split("\n").map((paragraph, index) => (
                    <p key={`about-text-${index}`}>{paragraph}</p>
                  ))
                : fallbackParagraphs.map((paragraph, index) => (
                    <p key={`about-fallback-${index}`}>{paragraph}</p>
                  ))}
            </div>
            <div className="aboutImg">
              <img src={image} alt="Golden Trail" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
