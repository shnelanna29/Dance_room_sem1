# План миграции на Feature-Sliced Design

## Общая структура миграции

### 1. СЛОЙ `app/` - Инициализация приложения

#### 1.1 Создание структуры `app/`
```
src/app/
├── providers/
│   ├── with-router.jsx
│   ├── with-query.jsx
│   └── with-auth.jsx
├── styles/
│   └── index.css
└── index.jsx
```

#### 1.2 Перемещения и изменения:

**Файлы для создания/перемещения:**

1. **`src/index.js` → `src/app/index.jsx`**
   - Переименовать `index.js` в `app/index.jsx`
   - Вынести логику провайдеров в отдельные файлы

2. **`src/index.css` → `src/app/styles/index.css`**
   - Переместить глобальные стили

3. **Создать `src/app/providers/with-router.jsx`**
   - Вынести `BrowserRouter` из `index.js`

4. **Создать `src/app/providers/with-query.jsx`**
   - Вынести `QueryClientProvider` из `index.js`

5. **Создать `src/app/providers/with-auth.jsx`**
   - Переместить `src/context/AuthContext.jsx` → `src/app/providers/with-auth.jsx`
   - Переименовать `AuthProvider` в более понятное имя или оставить

6. **Создать `src/index.js` (новый)**
   - Точка входа, которая импортирует `app/index.jsx`

---

### 2. СЛОЙ `pages/` - Страницы (роуты)

#### 2.1 Перемещения:

**Все страницы остаются в `pages/`, но меняется структура:**

1. **`src/pages/Home.jsx` → `src/pages/home/index.jsx`**
   - Переименовать файл и экспорт

2. **`src/pages/About.jsx` → `src/pages/about/index.jsx`**
   - Переименовать файл и экспорт

3. **`src/pages/Schedule.jsx` → `src/pages/schedule/index.jsx`**
   - Переименовать файл и экспорт

4. **`src/pages/Profile.jsx` → `src/pages/profile/index.jsx`**
   - Переименовать файл и экспорт

5. **`src/pages/Login.jsx` → `src/pages/login/index.jsx`**
   - Переименовать файл и экспорт

6. **`src/pages/Registration.jsx` → `src/pages/registration/index.jsx`**
   - Переименовать файл и экспорт

---

### 3. СЛОЙ `features/` - Бизнес-фичи (действия пользователя)

#### 3.1 Feature: `auth/`

**Структура:**
```
src/features/auth/
├── ui/
│   ├── login-form.jsx
│   └── register-form.jsx
├── model/
│   └── use-auth.js
├── api/
│   └── auth-api.js
└── index.js
```

**Перемещения:**

1. **Создать `src/features/auth/ui/login-form.jsx`**
   - Извлечь форму логина из `src/pages/Login.jsx`
   - Страница `login/index.jsx` будет только обёрткой

2. **Создать `src/features/auth/ui/register-form.jsx`**
   - Извлечь форму регистрации из `src/pages/Registration.jsx`
   - Страница `registration/index.jsx` будет только обёрткой

3. **Создать `src/features/auth/model/use-auth.js`**
   - Переместить хук `useAuth` из `AuthContext.jsx`
   - Или создать обёртку, которая использует контекст из `app/providers/with-auth.jsx`

4. **Создать `src/features/auth/api/auth-api.js`**
   - Извлечь методы работы с пользователями из `src/api/dataApi.js`:
     - `getUsers()`
     - `postUser(user)`

5. **Создать `src/features/auth/index.js`**
   - Public API для фичи auth

#### 3.2 Feature: `book-class/`

**Структура:**
```
src/features/book-class/
├── ui/
│   └── book-button.jsx
├── model/
│   └── use-book-class.js
├── api/
│   └── bookings-api.js
└── index.js
```

**Перемещения:**

1. **Создать `src/features/book-class/ui/book-button.jsx`**
   - Извлечь кнопку записи из `src/pages/Schedule.jsx` (или из компонента карточки)

2. **Создать `src/features/book-class/model/use-book-class.js`**
   - Извлечь логику бронирования из `src/pages/Schedule.jsx`:
     - `bookingMutation`
     - `handleBook`

3. **Создать `src/features/book-class/api/bookings-api.js`**
   - Извлечь методы из `src/api/dataApi.js`:
     - `getBookings()`
     - `postBooking(booking)`
     - `deleteBooking(id)`

4. **Создать `src/features/book-class/index.js`**
   - Public API

#### 3.3 Feature: `leave-review/`

**Структура:**
```
src/features/leave-review/
├── ui/
│   ├── review-form.jsx
│   ├── rating-select.jsx
│   └── review-text-field.jsx
├── model/
│   └── use-submit-review.js
├── api/
│   └── reviews-api.js
└── index.js
```

**Перемещения:**

1. **Создать `src/features/leave-review/ui/review-form.jsx`**
   - Извлечь форму отзыва из `src/pages/Profile.jsx`

2. **Создать `src/features/leave-review/ui/rating-select.jsx`**
   - Извлечь селект рейтинга (если есть отдельный компонент)
   - Или создать новый компонент

3. **Создать `src/features/leave-review/ui/review-text-field.jsx`**
   - Извлечь текстовое поле для отзыва (если есть отдельный компонент)
   - Или создать новый компонент

4. **Создать `src/features/leave-review/model/use-submit-review.js`**
   - Извлечь логику создания/обновления отзывов из `src/pages/Profile.jsx`:
     - `createReviewMutation`
     - `updateReviewMutation`
     - `deleteReviewMutation`

5. **Создать `src/features/leave-review/api/reviews-api.js`**
   - Переместить `src/api/reviewsApi.js` → `src/features/leave-review/api/reviews-api.js`
   - Добавить методы `updateReview`, `deleteReview` если их нет

6. **Создать `src/features/leave-review/index.js`**
   - Public API

#### 3.4 Feature: `filter-schedule/`

**Структура:**
```
src/features/filter-schedule/
├── ui/
│   └── schedule-filters.jsx
├── model/
│   └── use-filters.js
└── index.js
```

**Перемещения:**

1. **Создать `src/features/filter-schedule/ui/schedule-filters.jsx`**
   - Если есть компонент `ScheduleFilters.jsx`, переместить:
     - `src/components/schedule/ScheduleFilters.jsx` → `src/features/filter-schedule/ui/schedule-filters.jsx`
   - Если нет, создать пустой компонент для будущего функционала

2. **Создать `src/features/filter-schedule/model/use-filters.js`**
   - Логика фильтрации расписания

3. **Создать `src/features/filter-schedule/index.js`**
   - Public API

---

### 4. СЛОЙ `entities/` - Бизнес-сущности

#### 4.1 Entity: `user/`

**Структура:**
```
src/entities/user/
├── ui/
│   └── user-dropdown.jsx
├── model/
│   ├── use-current-user.js
│   └── user.types.ts (опционально, если используете TypeScript)
└── index.js
```

**Перемещения:**

1. **Создать `src/entities/user/ui/user-dropdown.jsx`**
   - Если есть компонент `UserDropdown.jsx`, переместить:
     - `src/components/common/nav/UserDropdown.jsx` → `src/entities/user/ui/user-dropdown.jsx`
   - Если нет, можно создать или пропустить

2. **Создать `src/entities/user/model/use-current-user.js`**
   - Хук для получения текущего пользователя (обёртка над `useAuth`)

3. **Создать `src/entities/user/index.js`**
   - Public API

#### 4.2 Entity: `teacher/`

**Структура:**
```
src/entities/teacher/
├── ui/
│   └── teacher-card.jsx
├── model/
│   ├── use-teachers.js
│   └── teacher.types.ts (опционально)
├── api/
│   └── teachers-api.js
└── index.js
```

**Перемещения:**

1. **Создать `src/entities/teacher/ui/teacher-card.jsx`**
   - Переместить `src/components/about/TeacherCard.jsx` → `src/entities/teacher/ui/teacher-card.jsx`

2. **Создать `src/entities/teacher/model/use-teachers.js`**
   - Переместить `src/hooks/useTeachers.js` → `src/entities/teacher/model/use-teachers.js`

3. **Создать `src/entities/teacher/api/teachers-api.js`**
   - Извлечь `getTeachers()` из `src/api/dataApi.js`

4. **Создать `src/entities/teacher/index.js`**
   - Public API

#### 4.3 Entity: `dance-style/`

**Структура:**
```
src/entities/dance-style/
├── ui/
│   └── styles-slider.jsx
├── model/
│   └── use-dance-styles.js
└── index.js
```

**Перемещения:**

1. **Создать `src/entities/dance-style/ui/styles-slider.jsx`**
   - Переместить `src/components/sliders/StylesSlider.jsx` → `src/entities/dance-style/ui/styles-slider.jsx`

2. **Создать `src/entities/dance-style/model/use-dance-styles.js`**
   - Переместить `src/hooks/useDanceStyles.js` → `src/entities/dance-style/model/use-dance-styles.js`

3. **Создать `src/entities/dance-style/api/` (если нужен)**
   - Извлечь `getStyles()` из `src/api/dataApi.js` в отдельный API файл

4. **Создать `src/entities/dance-style/index.js`**
   - Public API

#### 4.4 Entity: `booking/`

**Структура:**
```
src/entities/booking/
├── ui/
│   └── bookings-list.jsx
├── model/
│   └── use-bookings.js
└── index.js
```

**Перемещения:**

1. **Создать `src/entities/booking/ui/bookings-list.jsx`**
   - Извлечь список бронирований из `src/pages/Profile.jsx`

2. **Создать `src/entities/booking/model/use-bookings.js`**
   - Если есть хук `useBookings.js`, переместить:
     - `src/hooks/useBookings.js` → `src/entities/booking/model/use-bookings.js`
   - Если нет, создать хук для получения бронирований

3. **Создать `src/entities/booking/index.js`**
   - Public API

#### 4.5 Entity: `review/`

**Структура:**
```
src/entities/review/
├── ui/
│   ├── reviews-list.jsx
│   └── reviews-slider.jsx
├── model/
│   └── use-reviews.js
└── index.js
```

**Перемещения:**

1. **Создать `src/entities/review/ui/reviews-list.jsx`**
   - Извлечь список отзывов из `src/pages/Profile.jsx`

2. **Создать `src/entities/review/ui/reviews-slider.jsx`**
   - Переместить `src/components/sliders/ReviewsSlider.jsx` → `src/entities/review/ui/reviews-slider.jsx`

3. **Создать `src/entities/review/model/use-reviews.js`**
   - Переместить `src/hooks/useReviews.js` → `src/entities/review/model/use-reviews.js`

4. **Создать `src/entities/review/index.js`**
   - Public API

#### 4.6 Entity: `schedule-class/`

**Структура:**
```
src/entities/schedule-class/
├── ui/
│   └── schedule-card.jsx
├── model/
│   └── schedule-class.types.ts (опционально)
└── index.js
```

**Перемещения:**

1. **Создать `src/entities/schedule-class/ui/schedule-card.jsx`**
   - Переместить `src/components/schedule/ScheduleCard.jsx` → `src/entities/schedule-class/ui/schedule-card.jsx`
   - Или извлечь карточку из `src/pages/Schedule.jsx`

2. **Создать `src/entities/schedule-class/index.js`**
   - Public API

---

### 5. СЛОЙ `shared/` - Переиспользуемый код

#### 5.1 `shared/ui/` - UI Kit

**Структура:**
```
src/shared/ui/
├── button/
│   ├── button.jsx
│   └── index.js
├── input/
│   ├── text-input.jsx
│   ├── password-input.jsx
│   └── index.js
├── banner/
│   ├── banner.jsx
│   └── index.js
├── header/
│   ├── header.jsx
│   └── index.js
├── footer/
│   ├── footer.jsx
│   └── index.js
└── index.js
```

**Перемещения:**

1. **`src/shared/ui/button/`**
   - Создать компонент кнопки (если используется отдельный компонент)
   - Или оставить использование className "gradient-btn"

2. **`src/shared/ui/input/text-input.jsx`**
   - Переместить `src/components/common/inputs/TextInput.jsx` → `src/shared/ui/input/text-input.jsx`

3. **`src/shared/ui/input/password-input.jsx`**
   - Переместить `src/components/common/inputs/PasswordInput.jsx` → `src/shared/ui/input/password-input.jsx`

4. **`src/shared/ui/banner/banner.jsx`**
   - Переместить `src/components/common/Banner.jsx` → `src/shared/ui/banner/banner.jsx`

5. **`src/shared/ui/header/header.jsx`**
   - Переместить `src/components/common/Header.jsx` → `src/shared/ui/header/header.jsx`

6. **`src/shared/ui/footer/footer.jsx`**
   - Переместить `src/components/common/Footer.jsx` → `src/shared/ui/footer/footer.jsx`

#### 5.2 `shared/lib/` - Обёртки библиотек

**Структура:**
```
src/shared/lib/
├── react-query/
│   └── query-client.js
└── react-router/
    └── protected-route.jsx
```

**Перемещения:**

1. **`src/shared/lib/react-query/query-client.js`**
   - Создать конфигурацию QueryClient (вынести из `index.js`)

2. **`src/shared/lib/react-router/protected-route.jsx`**
   - Переместить `src/components/common/ProtectedRoute.jsx` → `src/shared/lib/react-router/protected-route.jsx`

#### 5.3 `shared/api/` - Базовая конфигурация API

**Структура:**
```
src/shared/api/
└── base-api.js
```

**Перемещения:**

1. **`src/shared/api/base-api.js`**
   - Создать базовую конфигурацию API (константа `API_BASE`)
   - Извлечь из `src/api/dataApi.js`

#### 5.4 `shared/config/` - Константы

**Структура:**
```
src/shared/config/
└── constants.js
```

**Перемещения:**

1. **`src/shared/config/constants.js`**
   - Создать файл с константами (если есть)

#### 5.5 `shared/utils/` - Утилиты

**Структура:**
```
src/shared/utils/
├── format-date.js
└── validate-email.js
```

**Перемещения:**

1. **`src/shared/utils/format-date.js`**
   - Создать утилиту для форматирования дат (если используется)

2. **`src/shared/utils/validate-email.js`**
   - Создать утилиту для валидации email (если используется)

---

### 6. Обновление `App.js`

**Файл: `src/App.js`**

- Обновить все импорты согласно новой структуре
- Импорты должны идти из правильных слоёв FSD

---

## Порядок выполнения миграции

### Этап 1: Подготовка структуры
1. Создать все папки согласно новой структуре
2. Создать все `index.js` файлы для public API

### Этап 2: Миграция `app/` слоя
1. Переместить стили
2. Создать провайдеры
3. Обновить точку входа

### Этап 3: Миграция `shared/` слоя
1. Переместить UI компоненты
2. Переместить библиотечные обёртки
3. Создать базовую конфигурацию API

### Этап 4: Миграция `entities/` слоя
1. Переместить сущности по одной
2. Обновить импорты в местах использования

### Этап 5: Миграция `features/` слоя
1. Создать фичи по одной
2. Извлечь логику из страниц
3. Обновить страницы для использования фич

### Этап 6: Миграция `pages/` слоя
1. Переименовать страницы
2. Обновить импорты
3. Упростить страницы (они должны только композировать фичи и entities)

### Этап 7: Обновление `App.js`
1. Обновить все импорты
2. Проверить работоспособность

### Этап 8: Удаление старых файлов
1. Удалить старые папки:
   - `src/components/`
   - `src/hooks/`
   - `src/api/`
   - `src/context/`
   - `src/query/` (если была)
   - `src/store/` (если была)

---

## Таблица соответствий файлов (старое → новое)

### Файлы, которые существуют и требуют перемещения:

| Старый путь | Новый путь | Примечание |
|------------|------------|------------|
| `src/index.js` | `src/app/index.jsx` | Переименовать и рефакторить |
| `src/index.css` | `src/app/styles/index.css` | Переместить |
| `src/context/AuthContext.jsx` | `src/app/providers/with-auth.jsx` | Переместить и возможно переименовать |
| `src/pages/Home.jsx` | `src/pages/home/index.jsx` | Переименовать |
| `src/pages/About.jsx` | `src/pages/about/index.jsx` | Переименовать |
| `src/pages/Schedule.jsx` | `src/pages/schedule/index.jsx` | Переименовать |
| `src/pages/Profile.jsx` | `src/pages/profile/index.jsx` | Переименовать |
| `src/pages/Login.jsx` | `src/pages/login/index.jsx` | Переименовать |
| `src/pages/Registration.jsx` | `src/pages/registration/index.jsx` | Переименовать |
| `src/components/common/Banner.jsx` | `src/shared/ui/banner/banner.jsx` | Переместить |
| `src/components/common/Header.jsx` | `src/shared/ui/header/header.jsx` | Переместить |
| `src/components/common/Footer.jsx` | `src/shared/ui/footer/footer.jsx` | Переместить |
| `src/components/common/ProtectedRoute.jsx` | `src/shared/lib/react-router/protected-route.jsx` | Переместить |
| `src/components/sliders/StylesSlider.jsx` | `src/entities/dance-style/ui/styles-slider.jsx` | Переместить |
| `src/components/sliders/ReviewsSlider.jsx` | `src/entities/review/ui/reviews-slider.jsx` | Переместить |
| `src/hooks/useDanceStyles.js` | `src/entities/dance-style/model/use-dance-styles.js` | Переместить |
| `src/hooks/useTeachers.js` | `src/entities/teacher/model/use-teachers.js` | Переместить |
| `src/hooks/useReviews.js` | `src/entities/review/model/use-reviews.js` | Переместить |
| `src/api/dataApi.js` | Разделить на несколько файлов | См. ниже |
| `src/api/reviewsApi.js` | `src/features/leave-review/api/reviews-api.js` | Переместить |

### Файлы, которые нужно создать (извлечь из существующих):

| Новый путь | Источник | Что извлечь |
|------------|----------|-------------|
| `src/app/providers/with-router.jsx` | `src/index.js` | `BrowserRouter` |
| `src/app/providers/with-query.jsx` | `src/index.js` | `QueryClientProvider` |
| `src/features/auth/ui/login-form.jsx` | `src/pages/Login.jsx` | Форма логина |
| `src/features/auth/ui/register-form.jsx` | `src/pages/Registration.jsx` | Форма регистрации |
| `src/features/auth/api/auth-api.js` | `src/api/dataApi.js` | `getUsers()`, `postUser()` |
| `src/features/book-class/ui/book-button.jsx` | `src/pages/Schedule.jsx` | Кнопка записи |
| `src/features/book-class/model/use-book-class.js` | `src/pages/Schedule.jsx` | Логика бронирования |
| `src/features/book-class/api/bookings-api.js` | `src/api/dataApi.js` | `getBookings()`, `postBooking()`, `deleteBooking()` |
| `src/features/leave-review/ui/review-form.jsx` | `src/pages/Profile.jsx` | Форма отзыва |
| `src/features/leave-review/model/use-submit-review.js` | `src/pages/Profile.jsx` | Мутации отзывов |
| `src/entities/booking/ui/bookings-list.jsx` | `src/pages/Profile.jsx` | Список бронирований |
| `src/entities/review/ui/reviews-list.jsx` | `src/pages/Profile.jsx` | Список отзывов пользователя |
| `src/entities/schedule-class/ui/schedule-card.jsx` | `src/pages/Schedule.jsx` | Карточка занятия |
| `src/shared/api/base-api.js` | `src/api/dataApi.js` | Константа `API_BASE` |
| `src/shared/lib/react-query/query-client.js` | `src/index.js` | Конфигурация `QueryClient` |

### Разделение `src/api/dataApi.js`:

Файл `dataApi.js` содержит методы для разных сущностей. Нужно разделить:

1. **`src/features/auth/api/auth-api.js`**
   - `getUsers()`
   - `postUser(user)`

2. **`src/features/book-class/api/bookings-api.js`**
   - `getBookings()`
   - `postBooking(booking)`
   - `deleteBooking(id)`

3. **`src/entities/teacher/api/teachers-api.js`**
   - `getTeachers()`

4. **`src/entities/dance-style/api/styles-api.js`** (создать новый)
   - `getStyles()`

5. **`src/entities/review/api/reviews-api.js`** (для получения отзывов)
   - `getReviews()` (из `dataApi.js`)

6. **`src/shared/api/base-api.js`**
   - Константа `API_BASE = 'http://localhost:3001'`

### Файлы, упомянутые в исходной структуре, но отсутствующие:

Эти файлы упоминались в исходной структуре, но не найдены в проекте. Их нужно будет создать при необходимости:

- `src/components/common/inputs/TextInput.jsx` → `src/shared/ui/input/text-input.jsx` (создать)
- `src/components/common/inputs/PasswordInput.jsx` → `src/shared/ui/input/password-input.jsx` (создать)
- `src/components/common/nav/NavLinkItem.jsx` → можно пропустить или создать
- `src/components/common/nav/UserDropdown.jsx` → `src/entities/user/ui/user-dropdown.jsx` (создать)
- `src/components/common/footer/FooterLink.jsx` → можно пропустить
- `src/components/common/footer/FooterSection.jsx` → можно пропустить
- `src/components/about/TeacherCard.jsx` → `src/entities/teacher/ui/teacher-card.jsx` (создать)
- `src/components/schedule/ScheduleCard.jsx` → `src/entities/schedule-class/ui/schedule-card.jsx` (создать или извлечь)
- `src/components/schedule/ScheduleFilters.jsx` → `src/features/filter-schedule/ui/schedule-filters.jsx` (создать)
- `src/components/profile/*` → извлечь из `Profile.jsx` или создать
- `src/components/reviews/*` → извлечь из существующих файлов
- `src/hooks/useBookings.js` → `src/entities/booking/model/use-bookings.js` (создать)
- `src/hooks/useProfilePage.js` → можно пропустить или разделить на фичи

---

## Важные замечания

1. **Public API**: Каждый модуль должен экспортировать только через `index.js`
2. **Импорты**: Импорты должны идти только из вышележащих слоёв:
   - `app` → может импортировать из всех слоёв
   - `pages` → может импортировать из `features`, `entities`, `shared`
   - `features` → может импортировать из `entities`, `shared`
   - `entities` → может импортировать из `shared`
   - `shared` → не импортирует из других слоёв

3. **Именование**: Использовать kebab-case для файлов и папок

4. **Типы**: Если используется TypeScript, добавить `.types.ts` файлы в `model/`

5. **Тестирование**: После каждого этапа проверять работоспособность приложения

6. **Постепенная миграция**: Рекомендуется делать миграцию постепенно, проверяя работоспособность после каждого шага

