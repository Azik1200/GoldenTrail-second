import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import "./ProfileCard.scss";

const ProfileCard = () => {
  const {
    profile,
    loading,
    error,
    saving,
    saveError,
    saveMessage,
    updateProfile,
  } = useProfile();
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      setFormState({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!profile || saving) return;

    try {
      await updateProfile(formState);
    } catch (err) {
      // Ошибку уже сохраняет хук, добавляем заглушку, чтобы подавить необработанные промисы.
    }
  };

  return (
    <section className="profile-card">
      <div className="container">
        <div className="profile-card__header">
          <h2>Мой профиль</h2>
          {loading && <span className="profile-card__status">Загрузка...</span>}
          {error && (
            <span className="profile-card__status profile-card__status--error">
              Не удалось загрузить профиль. Войдите, чтобы увидеть данные.
            </span>
          )}
        </div>

        {!loading && !error && !profile && (
          <p className="profile-card__empty">Профиль недоступен.</p>
        )}

        {profile && (
          <div className="profile-card__body">
            <div className="profile-card__row">
              <span className="profile-card__label">Логин</span>
              <span className="profile-card__value">{profile.username || "—"}</span>
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Email</span>
              <span className="profile-card__value">{profile.email || "—"}</span>
            </div>

            <form className="profile-card__form" onSubmit={handleSubmit}>
              <div className="profile-card__form-row">
                <label className="profile-card__form-label" htmlFor="first_name">
                  Имя
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formState.first_name}
                  onChange={handleChange}
                  placeholder="Введите имя"
                  disabled={saving}
                />
              </div>
              <div className="profile-card__form-row">
                <label className="profile-card__form-label" htmlFor="last_name">
                  Фамилия
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formState.last_name}
                  onChange={handleChange}
                  placeholder="Введите фамилию"
                  disabled={saving}
                />
              </div>
              <div className="profile-card__form-row">
                <label className="profile-card__form-label" htmlFor="phone">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="Введите телефон"
                  disabled={saving}
                />
              </div>

              <div className="profile-card__form-actions">
                {saveMessage && !saveError && (
                  <span className="profile-card__status">{saveMessage}</span>
                )}
                {saveError && (
                  <span className="profile-card__status profile-card__status--error">
                    Не удалось обновить профиль
                  </span>
                )}
                <button type="submit" disabled={saving}>
                  {saving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileCard;
