# Naming Guidelines

Документ описывает соглашения об именовании для проекта Dance Room.

## Общие принципы

1. **Консистентность** - используйте единый стиль во всем проекте
2. **Ясность** - имена должны быть понятными и описывать назначение
3. **Краткость** - избегайте излишне длинных имен, но не в ущерб ясности

## Компоненты (React Components)

**Стиль:** PascalCase  
**Суффикс:** Без суффикса для компонентов, `Page` для страниц

```javascript
// ✅ Правильно
export const Header = () => { ... }
export const LoginForm = () => { ... }
export const HomePage = () => { ... }
export const TeacherCard = () => { ... }

// ❌ Неправильно
export const header = () => { ... }
export const login_form = () => { ... }
export const home = () => { ... }
```

**Файлы компонентов:** kebab-case с расширением `.jsx`

```
✅ header.jsx
✅ login-form.jsx
✅ teacher-card.jsx
✅ home-page.jsx

❌ Header.jsx
❌ loginForm.jsx
❌ teacher_card.jsx
```

## Хуки (Custom Hooks)

**Стиль:** camelCase с префиксом `use`  
**Файлы:** kebab-case с префиксом `use-`

```javascript
// ✅ Правильно
export const useAuth = () => { ... }
export const useDanceStyles = () => { ... }
export const useBookClass = () => { ... }
export const useSubmitReview = () => { ... }

// ❌ Неправильно
export const Auth = () => { ... }
export const getDanceStyles = () => { ... }
export const use_book_class = () => { ... }
```

**Файлы:**
```
✅ use-auth.js
✅ use-dance-styles.js
✅ use-book-class.js

❌ useAuth.js
❌ useDanceStyles.js
```

## Функции и переменные

**Стиль:** camelCase

```javascript
// ✅ Правильно
const handleSubmit = () => { ... }
const getUserData = () => { ... }
const isLoading = true;
const userBookings = [];

// ❌ Неправильно
const HandleSubmit = () => { ... }
const get_user_data = () => { ... }
const IsLoading = true;
const user_bookings = [];
```

## Константы

**Стиль:** SCREAMING_SNAKE_CASE

```javascript
// ✅ Правильно
export const API_BASE = 'http://localhost:3001';
export const MAX_BOOKINGS = 10;
export const DEFAULT_RATING = 5;

// ❌ Неправильно
export const apiBase = 'http://localhost:3001';
export const maxBookings = 10;
export const defaultRating = 5;
```

## Типы и интерфейсы (для TypeScript)

**Стиль:** PascalCase  
**Суффиксы:** `Props` для пропсов компонентов, `Type` для типов, без суффикса для интерфейсов

```typescript
// ✅ Правильно (для будущего TypeScript)
interface User {
  id: string;
  name: string;
  email: string;
}

type UserProps = {
  user: User;
  onEdit: (id: string) => void;
};

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
```

## API модули и сервисы

**Стиль:** camelCase с суффиксом `Api` или `Service`

```javascript
// ✅ Правильно
export const authApi = { ... }
export const bookingsApi = { ... }
export const reviewsApi = { ... }
export const userService = { ... }

// ❌ Неправильно
export const AuthAPI = { ... }
export const bookings_api = { ... }
export const Reviews = { ... }
```

## Утилиты

**Стиль:** camelCase  
**Файлы:** kebab-case

```javascript
// ✅ Правильно
export const formatDate = (date) => { ... }
export const validateEmail = (email) => { ... }
export const getStyleImagePath = (name) => { ... }

// Файлы
✅ format-date.js
✅ validate-email.js
✅ image-loader.js
```

## Папки и директории

**Стиль:** kebab-case

```
✅ src/
  ├── features/
  │   ├── book-class/
  │   └── leave-review/
  ├── entities/
  │   ├── dance-style/
  │   └── teacher/
  └── shared/
      ├── ui/
      └── utils/

❌ src/
  ├── Features/
  │   ├── BookClass/
  └── entities/
      ├── DanceStyle/
```

## Именование в контексте FSD

### Features (Фичи)
Имя фичи описывает **действие пользователя**:
```
✅ book-class (записаться на занятие)
✅ leave-review (оставить отзыв)
✅ filter-schedule (фильтровать расписание)

❌ booking (сущность, не действие)
❌ review (сущность, не действие)
```

### Entities (Сущности)
Имя сущности описывает **бизнес-объект**:
```
✅ user (пользователь)
✅ teacher (преподаватель)
✅ booking (бронирование)
✅ review (отзыв)
✅ dance-style (стиль танца)
✅ schedule-class (занятие в расписании)
```

### Shared
Имя описывает **назначение**:
```
✅ ui (UI компоненты)
✅ lib (обертки библиотек)
✅ api (базовая конфигурация API)
✅ utils (утилиты)
✅ config (конфигурация)
```

## Исключения

1. **Компоненты из библиотек** - используйте оригинальные имена:
   ```javascript
   import { Swiper, SwiperSlide } from 'swiper/react';
   ```

2. **Стандартные React хуки** - используйте оригинальные имена:
   ```javascript
   import { useState, useEffect } from 'react';
   ```

3. **Константы из конфига** - могут быть в camelCase, если это настройки:
   ```javascript
   const queryClientConfig = { ... };
   ```

## Проверка соответствия

Для автоматической проверки используйте ESLint с правилами:
- `camelcase` - для переменных и функций
- `@typescript-eslint/naming-convention` - для TypeScript (если используется)

## Примеры полных путей

```
✅ src/features/auth/ui/login-form.jsx
✅ src/entities/teacher/model/use-teachers.js
✅ src/shared/utils/image-loader.js
✅ src/pages/home/index.jsx

❌ src/Features/Auth/UI/LoginForm.jsx
❌ src/entities/Teacher/Model/useTeachers.js
```

---

**Последнее обновление:** Декабрь 2025

