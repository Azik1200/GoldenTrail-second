import "./Testimonials.scss";
import useTestimonials from "../../hooks/useTestimonials";
import { useLanguageContext } from "../../context/LanguageContext";

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
};

const Testimonials = () => {
  const testimonials = useTestimonials();
  const hasTestimonials = Array.isArray(testimonials) && testimonials.length > 0;
  const { t } = useLanguageContext();

  return (
    <div className="testimonials">
      <div className="container">
        <h2 className="testimonialsHeader">{t("home.testimonials.title")}</h2>
        <div className="testimonialsList">
          {hasTestimonials ? (
            testimonials.map((item, index) => (
              <div className="testimonialsItem" key={`${item.author_name || "item"}-${index}`}>
                <div className="testimonialsItemAuthor">
                  {item.author_name || "Аноним"}
                </div>
                <div className="testimonialsItemMessage">{item.message}</div>
                {item.created_at && (
                  <div className="testimonialsItemDate">{formatDate(item.created_at)}</div>
                )}
              </div>
            ))
          ) : (
            <div className="testimonialsEmpty">{t("home.testimonials.empty")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
