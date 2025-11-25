import { useState } from "react";
import "./Form.scss";
import { submitContact } from "../../api/contact";
import useLanguage from "../../hooks/useLanguage";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
  agreement: false,
};

const Form = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = t("form.nameRequired");
    }

    if (!form.message.trim()) {
      nextErrors.message = t("form.messageRequired");
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t("form.emailInvalid");
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        message: form.message.trim(),
      };

      const response = await submitContact(payload);
      setStatus(response?.message || t("form.statusSuccess"));
      setForm(initialForm);
    } catch (error) {
      setStatus(t("form.statusError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="form">
        <div className="container">
          <div className="formWrapper">
            <div className="formLeft">
              <h2 className="formHeader">{t("form.title")}</h2>
              <div className="formText">{t("form.subtitle")}</div>
            </div>
            <div className="formRight">
              <form className="MainForm" onSubmit={handleSubmit}>
                <div className={`inputWrapper${errors.name ? " error" : ""}`}>
                  <input
                    name="name"
                    placeholder={t("form.name")}
                    value={form.name}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  {errors.name && <span className="inputError">{errors.name}</span>}
                </div>
                <div className="inputWrapper">
                  <input
                    name="phone"
                    placeholder={t("form.phone")}
                    value={form.phone}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
                <div className={`inputWrapper${errors.email ? " error" : ""}`}>
                  <input
                    name="email"
                    type="email"
                    placeholder={t("form.email")}
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  {errors.email && <span className="inputError">{errors.email}</span>}
                </div>
                <div className={`inputWrapper${errors.message ? " error" : ""}`}>
                  <textarea
                    name="message"
                    placeholder={t("form.comment")}
                    value={form.message}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  {errors.message && (
                    <span className="inputError">{errors.message}</span>
                  )}
                </div>

                <div className="inputWrapper">
                  <div className="agreement">
                    <input
                      type="checkbox"
                      name="agreement"
                      id="agreementCheckbox"
                      checked={form.agreement}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    <div className="agreementText">
                      {t("form.agreement")}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mainBtn orderEasilyBtn "
                  disabled={submitting}
                >
                  {submitting ? t("form.submitting") : t("form.submit")}
                </button>
                {status && <div className="formStatus">{status}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
