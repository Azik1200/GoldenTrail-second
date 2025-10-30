import "./Warranty.scss";

const Warranty = () => {
  return (
    <>
      <div className="warranty">
        <div className="container">
          <div className="warrantyWrapper">
            <div className="warrantyText">
              <h2 className="warrantyHeader">Гарантия</h2>
              <div className="warrantyDesc">
                Мы уверены в надёжности и качестве нашей продукции, поэтому
                предоставляем 2 года официальной гарантии. В течение
                гарантийного срока вы получаете бесплатное сервисное
                обслуживание и ремонт в случае выявления заводских дефектов.
                Наша сервисная сеть всегда готова помочь вам, чтобы ваша техника
                работала бесперебойно и дарила комфорт каждый день.
              </div>
            </div>
            <div className="warrantyTime">
              <div className="warrantyTimeNumber">24</div>
              <div className="warrantyTimeText">месяца</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Warranty;
