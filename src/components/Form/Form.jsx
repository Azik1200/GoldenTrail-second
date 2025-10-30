import "./Form.scss";

const Form = () => {
  return (
    <>
      <div className="form">
        <div className="container">
          <div className="formWrapper">
            <div className="formLeft">
              <h2 className="formHeader">Закажите легко</h2>
              <div className="formText">
                Оставьте заявку и мы свяжемся с вами в ближайшее время
              </div>
            </div>
            <div className="formRight">
              <form action="#" className="MainForm">
                <div className="inputWrapper error">
                  <input
                    name="name"
                    placeholder="Имя*"
                    // value={form.name}
                    // onChange={handleChange}
                  />
                  <span className="inputError">*Ошибка текст</span>
                </div>
                <div className="inputWrapper">
                  <input
                    name="phone"
                    placeholder="+994-__-___-__-__"
                    // value={form.phone}
                    // onChange={handleChange}
                  />
                  <span className="inputError">*Ошибка текст</span>
                </div>
                <div className="inputWrapper">
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail*"
                    // value={form.email}
                    // onChange={handleChange}
                  />
                  <span className="inputError">*Ошибка текст</span>
                </div>
                <textarea
                  name="message"
                  placeholder="Комментарий к заказу"
                  // value={form.message}
                  // onChange={handleChange}
                />

                <div className="inputWrapper">
                  <div className="agreement">
                    <input
                      type="checkbox"
                      name="agreementCheckbox"
                      id="agreementCheckbox"
                    />
                    <div className="agreementText">
                      Соглашаюсь на обработку{" "}
                      <a href="#">персональных данных</a> и с{" "}
                      <a href="#">условиями публичной оферты</a>
                    </div>
                  </div>
                  <span className="inputError">*Ошибка текст</span>
                </div>
                <button type="submit" className="mainBtn orderEasilyBtn ">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
