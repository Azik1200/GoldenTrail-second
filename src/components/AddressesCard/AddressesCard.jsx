import { useEffect, useMemo, useState } from "react";
import useAddresses from "../../hooks/useAddresses";
import "./AddressesCard.scss";

const initialFormState = {
  address_line: "",
  city: "",
  postal_code: "",
  country: "",
  is_default: false,
};

const AddressesCard = () => {
  const {
    addresses,
    loading,
    error,
    saving,
    deletingId,
    message,
    actionError,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAddresses();

  const [formState, setFormState] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId) {
      const current = addresses.find((item) => item.id === editingId);
      if (current) {
        setFormState({
          address_line: current.address_line || "",
          city: current.city || "",
          postal_code: current.postal_code || "",
          country: current.country || "",
          is_default: Boolean(current.is_default),
        });
      }
    }
  }, [addresses, editingId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;

    try {
      if (editingId) {
        await updateAddress(editingId, formState);
      } else {
        await addAddress(formState);
      }
      setEditingId(null);
      setFormState(initialFormState);
    } catch (err) {
      // error already handled in hook
    }
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormState({
      address_line: address.address_line || "",
      city: address.city || "",
      postal_code: address.postal_code || "",
      country: address.country || "",
      is_default: Boolean(address.is_default),
    });
  };

  const handleSetDefault = async (address) => {
    if (saving) return;
    const payload = {
      address_line: address.address_line || "",
      city: address.city || "",
      postal_code: address.postal_code || "",
      country: address.country || "",
      is_default: true,
    };

    try {
      await updateAddress(address.id, payload);
    } catch (err) {
      // handled by hook
    }
  };

  const currentDefaultId = useMemo(
    () => addresses.find((item) => item.is_default)?.id || null,
    [addresses]
  );

  return (
    <section className="addresses-card">
      <div className="container">
        <div className="addresses-card__header">
          <h2>Мои адреса</h2>
          {loading && <span className="addresses-card__status">Загрузка...</span>}
          {error && (
            <span className="addresses-card__status addresses-card__status--error">
              Не удалось загрузить адреса. Войдите, чтобы продолжить.
            </span>
          )}
        </div>

        {message && !actionError && (
          <div className="addresses-card__status addresses-card__status--success">
            {message}
          </div>
        )}
        {actionError && (
          <div className="addresses-card__status addresses-card__status--error">
            Не удалось выполнить действие. Попробуйте снова.
          </div>
        )}

        {!loading && !error && addresses.length === 0 && (
          <p className="addresses-card__empty">Адреса не найдены.</p>
        )}

        {addresses.length > 0 && (
          <div className="addresses-card__list">
            {addresses.map((address) => (
              <div key={address.id} className="addresses-card__item">
                <div className="addresses-card__item-main">
                  <div className="addresses-card__item-line">{address.address_line}</div>
                  <div className="addresses-card__item-meta">
                    <span>{address.city}</span>
                    {address.postal_code && <span> {address.postal_code}</span>}
                    <span>, {address.country}</span>
                  </div>
                </div>
                <div className="addresses-card__item-actions">
                  {address.is_default && (
                    <span className="addresses-card__badge">Основной</span>
                  )}
                  {!address.is_default && (
                    <button
                      type="button"
                      className="addresses-card__link"
                      disabled={saving}
                      onClick={() => handleSetDefault(address)}
                    >
                      Сделать основным
                    </button>
                  )}
                  <button
                    type="button"
                    className="addresses-card__link"
                    disabled={saving}
                    onClick={() => handleEdit(address)}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="addresses-card__link addresses-card__link--danger"
                    disabled={deletingId === address.id}
                    onClick={() => deleteAddress(address.id)}
                  >
                    {deletingId === address.id ? "Удаление..." : "Удалить"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <form className="addresses-card__form" onSubmit={handleSubmit}>
          <div className="addresses-card__form-grid">
            <label className="addresses-card__field">
              <span>Адрес</span>
              <input
                name="address_line"
                type="text"
                value={formState.address_line}
                onChange={handleChange}
                placeholder="Улица, дом"
                required
                disabled={saving}
              />
            </label>
            <label className="addresses-card__field">
              <span>Город</span>
              <input
                name="city"
                type="text"
                value={formState.city}
                onChange={handleChange}
                placeholder="Город"
                required
                disabled={saving}
              />
            </label>
            <label className="addresses-card__field">
              <span>Почтовый индекс</span>
              <input
                name="postal_code"
                type="text"
                value={formState.postal_code}
                onChange={handleChange}
                placeholder="AZ0000"
                disabled={saving}
              />
            </label>
            <label className="addresses-card__field">
              <span>Страна</span>
              <input
                name="country"
                type="text"
                value={formState.country}
                onChange={handleChange}
                placeholder="Страна"
                required
                disabled={saving}
              />
            </label>
            <label className="addresses-card__checkbox">
              <input
                name="is_default"
                type="checkbox"
                checked={formState.is_default}
                onChange={handleChange}
                disabled={saving}
              />
              <span>Сделать основным адресом</span>
            </label>
          </div>

          <div className="addresses-card__actions">
            <button type="submit" disabled={saving}>
              {saving
                ? "Сохранение..."
                : editingId
                  ? "Обновить адрес"
                  : "Добавить адрес"}
            </button>
            {editingId && (
              <button
                type="button"
                className="addresses-card__link"
                onClick={() => {
                  setEditingId(null);
                  setFormState(initialFormState);
                }}
                disabled={saving}
              >
                Отменить редактирование
              </button>
            )}
          </div>
        </form>

        {currentDefaultId && (
          <p className="addresses-card__note">
            Основной адрес используется по умолчанию при оформлении заказа.
          </p>
        )}
      </div>
    </section>
  );
};

export default AddressesCard;
