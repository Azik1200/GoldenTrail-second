import "./About.scss";
import AboutImg from "./../../assets/img/AboutImg.png";

const About = () => {
  return (
    <>
      <div className="about">
        <div className="container">
          <h2 className="aboutHeader">О нас</h2>
          <div className="aboutWrapper">
            <div className="aboutText">
              <p>
                Мы являемся официальным дистрибьютором продукции Ferroli в
                Азербайджане — итальянского производителя с более чем 65-летним
                опытом в сфере отопления, водонагрева и климатических решений.
              </p>
              <p>
                Наша миссия — предлагать клиентам современное, энергоэффективное
                и надёжное оборудование, которое соответствует европейским
                стандартам качества и дарит комфорт в каждый дом.
              </p>
              <p>
                Ferroli — это инновации, долговечность и стиль, а мы — ваш
                надёжный партнёр на пути к комфорту и теплу.
              </p>
            </div>
            <div className="aboutImg">
              <img src={AboutImg} alt="Golden Trail" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
