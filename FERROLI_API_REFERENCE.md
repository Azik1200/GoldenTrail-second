# Goldentrail & Ferroli API Reference

Обновлённая карта REST API для витрин **Goldentrail** (`https://goldentrail.az`) и **Ferroli** (`https://ferroli.goldentrail.az`) с привязкой к разделам интерфейса Ferroli. Контракты одинаковые; сайт выбирается по домену или административному префиксу, что влияет на доступные каталоги, способы доставки и оплаты.

## Базовая конфигурация клиента
- API базируется на `VITE_API_BASE_URL` (по умолчанию `https://ferroli.goldentrail.az`). Для локалки `localhost` автоматически заменяется на HTTPS-хост, чтобы работали куки.
- Все запросы добавляют заголовок `X-Language` (`az` по умолчанию; переключать при смене языка интерфейса), а авторизованные запросы передают `Authorization: Bearer <token>`.
- Изображения товаров собираются через `VITE_IMAGE_BASE_URL` или `${API_BASE_URL}/storage/product-images`; баннеры слайдера — через `VITE_SLIDE_IMAGE_BASE_URL` или `${API_BASE_URL}/storage`.

## Определение сайта и локализация
- Хост или путь `admin/ferroli*` / `admin/goldentrail*` задают внутренний флаг `is_ferroli`; он используется при валидации заказов, платежей и доставок.
- Текстовые поля выбираются по `X-Language`; если перевода нет, API возвращает первое доступное значение.

## Домашняя страница
- **Слайдер**: `/api/slides` — источник данных для SwiperMain/BanerReviews. Вызов реализован в `fetchSlides` (передаёт куки и
  `X-Language`, базовый URL берёт из `VITE_API_BASE_URL`), изображения приводятся к абсолютным через `formatSlideImageUrl`
  (`VITE_SLIDE_IMAGE_BASE_URL` либо `${API_BASE_URL}/storage`). `useSlides` запрашивает их один раз при монтировании, ожидаемая
  структура элемента: `id`, `small_text`, `big_text`, `medium_text`, `image`.
- **Популярные/новые товары**: `/api/products` с параметрами `catalog`/`category` или сортировками по популярности/новизне (в соответствии с бэкендом). Ответ содержит цену, основное изображение и флаги наличия для карточек.
- **Категории**: `/api/categories` — дерево категорий для блока подборок. Пример ответа:

  ```json
  [
    {
      "id": 1,
      "slug": "masks",
      "name": "Maskalar",
      "children": [
        {
          "id": 2,
          "slug": "children-masks",
          "name": "Uşaq maskaları"
        }
      ]
    }
  ]
  ```
- **Отзывы**: `/api/testimonials` — сообщения клиентов для секции преимуществ.

  ```json
  [
    {
      "author_name": "Aysel M.",
      "message": "Çox keyfiyyətli məhsuldur!",
      "created_at": "2025-06-09 15:22:41"
    },
    {
      "author_name": "Fuad Q.",
      "message": "Sürətli çatdırılma və yaxşı xidmət.",
      "created_at": "2025-06-08 12:45:01"
    }
  ]
  ```
- **Блок «О нас»**: `/api/about-us` — картинка и текст.

  ```json
  {
    "image": "https://...",
    "text": "..."
  }
  ```

## Каталог и фильтры
- **Список товаров**: `/api/products` с параметрами `category` (slug категории) и/или `catalog` (slug каталога) + пагинация/сортировки, если доступны на сервере.
- **Фильтры**: `/api/products/filters` — цвета, размеры, бренды, ценовой диапазон и иерархия каталога/категорий; используется для построения фильтров в `Catalog.jsx` и сайдбара. Пример ответа:

  ```json
  [
    {
      "colors": ["Ağ", "Mavi"],
      "sizes": ["S", "M", "L"],
      "min_price": 1.5,
      "max_price": 25,
      "brands": ["GoldenProtect", "SafeTouch"],
      "catalogs": [
        {
          "id": 1,
          "slug": "medical",
          "name": "Tibbi",
          "categories": [
            {
              "id": 2,
              "slug": "masks",
              "name": "Maskalar",
              "children": []
            }
          ]
        }
      ]
    }
  ]
  ```
- **Древо каталогов**: `/api/catalogs` — список каталогов с вложенными категориями для шапки и футера навигации.
- **Контактная форма каталога**: `/api/contact` — отправка заявки с полями `name` (обязательно), `phone`, `email`, `message` (обязательно). Пример запроса и ответа:

  ```json
  {
    "name": "Aziz",
    "phone": "+994505551234",
    "email": "aziz@example.com",
    "message": "Salam, məhsul haqqında sualım var."
  }
  ```

  ```json
  {
    "message": "Сообщение успешно отправлено",
    "id": 3
  }
  ```

## Карточка товара
- **Детальные данные**: `/api/products/{id}` — подробности товара для `ProductElement`: переводы, галерея изображений, цвета/размеры, области применения, преимущества, комплектация. Пример ответа:

  ```json
  [
    {
      "id": 1,
      "sku": "MASK-001",
      "brand": "GoldenProtect",
      "price": 2.5,
      "discount": 10,
      "stock_quantity": 500,
      "has_warranty": true,
      "title": "Tibbi Maska (3 qat)",
      "short_description": "...",
      "full_description": "...",
      "warranty_text": "12 ay zəmanət",
      "images": ["...", "..."],
      "colors": ["Ağ"],
      "sizes": ["M", "L"],
      "application_areas": ["Xəstəxana", "Laboratoriya"],
      "advantage_items": ["Rahat nəfəs alma", "Yüngül material"],
      "package_contents": ["10 ədəd maska", "1 bələdçi"]
    }
  ]
  ```

- **Рекомендации «Похожие»**: `/api/products` с теми же `category`/`catalog`, что у текущего товара, или с серверным параметром «related», если доступен.

## Блог и контент
- **Список постов**: `/api/blogs` — для ленты блога.
- **Деталь поста**: `/api/blogs/{slug}` — загрузка статьи по URL-части.

## Аутентификация и профиль
- `/api/register` (POST `username`, `email`, `password`) — регистрация, ответ содержит Sanctum-токен.
- `/api/login` (POST `email`, `password`) — вход, токен в ответе.
- `/api/me` (GET, с токеном) — данные текущего пользователя для шапки/личного кабинета.
- `/api/logout` (POST, с токеном) — выход.
- `/api/profile` (GET/PUT, auth) — чтение и обновление профиля; вызывать при открытии/сохранении формы аккаунта.
  - Требует авторизации (Sanctum) и заголовка `X-Language` для возврата правильных переводов полей профиля.
  - Пример ответа GET:
    ```json
    {
      "username": "aziz",
      "email": "aziz@example.com",
      "first_name": "Əziz",
      "last_name": "Səlim",
      "phone": "+994552886510"
    }
    ```
  - Пример тела PUT:
    ```json
    {
      "first_name": "Əziz",
      "last_name": "Səlimov",
      "phone": "+994552886510"
    }
    ```
  - Пример ответа PUT:
    ```json
    { "message": "Профиль обновлён" }
    ```
- `/api/profile/addresses` (GET/POST/PUT/DELETE) — CRUD адресов доставки; POST/PUT поддерживают `is_default=true` для назначения основного адреса. Примеры:
  - GET ответ:
    ```json
    [
      {
        "id": 1,
        "address_line": "Bakı şəhəri, Nizami küç. 123",
        "city": "Bakı",
        "postal_code": "AZ1000",
        "country": "Azərbaycan",
        "is_default": true
      }
    ]
    ```
  - POST тело:
    ```json
    {
      "address_line": "Fətəli Xan küç. 7",
      "city": "Bakı",
      "postal_code": "AZ1025",
      "country": "Azərbaycan",
      "is_default": false
    }
    ```
    Ответ:
    ```json
    {
      "id": 2,
      "address_line": "Fətəli Xan küç. 7",
      "city": "Bakı",
      "postal_code": "AZ1025",
      "country": "Azərbaycan",
      "is_default": false
    }
    ```
  - PUT `/api/profile/addresses/{id}` тело:
    ```json
    {
      "address_line": "Yeni ünvan",
      "city": "Bakı",
      "postal_code": "AZ1001",
      "country": "Azərbaycan",
      "is_default": true
    }
    ```
    Ответ:
    ```json
    { "message": "Адрес обновлён" }
    ```
  - DELETE `/api/profile/addresses/{id}` ответ:
    ```json
    { "message": "Адрес удалён" }
    ```

## Корзина и избранное (авторизация обязательна)
- `/api/cart` (GET) — загрузить корзину для страницы Basket.
  - Пример ответа:
    ```json
    [
      {
        "product_id": 1,
        "title": "Tibbi Maska (3 qat)",
        "image": "https://...",
        "price": 5.99,
        "color": "Red",
        "size": "M",
        "quantity": 2,
        "total_price": 11.98
      }
    ]
    ```
- `/api/cart` (POST) — добавить/обновить позицию с `product_id`, `quantity` (>=1), опционально `product_color_id`, `product_size_id`, `price`.
  - Пример тела:
    ```json
    {
      "product_id": 1,
      "quantity": 2,
      "product_color_id": 3,
      "product_size_id": 1,
      "price": 5.99
    }
    ```
  - Пример ответа:
    ```json
    {
      "message": "Товар добавлен в корзину",
      "item": {
        "id": 5,
        "user_id": 1,
        "product_id": 1,
        "product_color_id": 3,
        "product_size_id": 1,
        "price": 5.99,
        "quantity": 2
      }
    }
    ```
- `/api/cart/{id}/increment` и `/api/cart/{id}/decrement` — изменения количества из контролов корзины; decrement удалит строку при достижении нуля.
  - Тело запроса: пустое.
  - Пример ответа для increment:
    ```json
    {
      "message": "Количество товара увеличено",
      "item": {
        "id": 5,
        "user_id": 1,
        "product_id": 1,
        "quantity": 3
      }
    }
    ```
  - Пример ответа для decrement (при нулевом количестве позиция исчезает из списка):
    ```json
    {
      "message": "Количество товара уменьшено",
      "item": {
        "id": 5,
        "user_id": 1,
        "product_id": 1,
        "quantity": 1
      }
    }
    ```
- `/api/cart/{id}` (DELETE) — удалить позицию из корзины по её `id`.
  - Тело запроса: пустое.
  - Пример ответа:
    ```json
    {
      "message": "Товар удалён из корзины"
    }
    ```
- `/api/favorites` — управление избранным (требует авторизации через Sanctum):
  - **POST**. Тело: `product_id` (обязательное число). Добавляет товар в избранное, при успехе вернёт id записи:
    ```json
    {
      "message": "Добавлено в избранное",
      "item": {
        "id": 3,
        "user_id": 1,
        "product_id": 1
      }
    }
    ```
  - **GET**. Заголовок `X-Language` (по умолчанию `az`). Возвращает список избранного с локализованными товарами и изображениями:
    ```json
    [
      {
        "product_id": 1,
        "title": "Tibbi Maska (3 qat)",
        "image": "https://...",
        "price": 2.5
      }
    ]
    ```
  - **DELETE** `/api/favorites/{id}`. Удаляет запись по `favorites.id`:
    ```json
    {
      "message": "Удалено из избранного"
    }
    ```

## Оформление заказа (авторизация обязательна)
- `/api/orders` (POST) — создание заказа из текущей корзины. Тело: `payment_method_id`, `shipping_method_id` (ограничены активным сайтом). При успехе корзина очищается и отправляется письмо подтверждения:
  ```json
  {
    "payment_method_id": 1,
    "shipping_method_id": 2
  }
  ```
  Пример ответа:
  ```json
  {
    "message": "Заказ успешно оформлен",
    "order_id": 1
  }
  ```
- `/api/orders` (GET) — история заказов пользователя. Возвращает массив упорядоченных по дате записей с суммой, статусом, датой и количеством позиций:
  ```json
  [
    {
      "id": 1,
      "status": "pending",
      "total_amount": 14.0,
      "created_at": "2025-06-09 18:32:10",
      "items_count": 2
    }
  ]
  ```
- `/api/orders/{id}` (GET) — детали заказа для страницы статуса/деталей с составом товаров и названиями способов оплаты/доставки:
  ```json
  {
    "id": 1,
    "status": "pending",
    "total_amount": 14.0,
    "payment_method": "Наличные при получении",
    "shipping_method": "Курьером по городу",
    "created_at": "2025-06-09 18:32:10",
    "items": [
      {
        "product_id": 1,
        "title": "Tibbi Maska (3 qat)",
        "image": "https://...",
        "price": 2.5,
        "quantity": 2,
        "total": 5.0
      }
    ]
  }
  ```

## Общие примечания
- Домены ферролли/голдентрейл автоматически направляют запросы на нужный набор каталогов, доставок и оплат — никаких дополнительных флагов в запросах не нужно.
- Один и тот же пользователь и токен работают на обоих доменах.
- Все ответы — JSON; ошибки используют стандартные коды (400 для пустой корзины, 401 для невалидной авторизации, 404/409 по ситуации).
