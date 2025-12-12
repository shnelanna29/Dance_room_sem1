# Архитектура проекта Dance Room

## Обзор

Проект использует архитектурный подход **Feature-Sliced Design (FSD)** для организации кода React-приложения.

## Выбранный подход: Feature-Sliced Design

### Обоснование

FSD выбран как оптимальный подход для React-приложения среднего размера, так как:
- Организация по бизнес-логике, а не по техническим слоям
- Четкие правила импортов предотвращают циклические зависимости
- Масштабируемость - легко добавлять новые фичи
- Изоляция фич друг от друга
- Подходит для командной разработки

## Структура проекта

```
src/
├── app/                    # Слой инициализации приложения
├── pages/                  # Слой страниц (роуты)
├── features/               # Бизнес-фичи (действия пользователя)
├── entities/               # Бизнес-сущности (модели данных)
└── shared/                 # Переиспользуемый код
```

## Описание слоев

### 1. app/ - Инициализация приложения

**Назначение:** Инициализация провайдеров, роутера, глобальных стилей.

**Структура:**
```
app/
├── providers/              # Провайдеры (Router, Query, Auth)
│   ├── with-router.jsx
│   ├── with-query.jsx
│   └── with-auth.jsx
├── styles/                 # Глобальные стили
│   └── index.css
└── index.jsx              # Композиция App компонента
```

**Правила:**
- Может импортировать из всех слоев
- Содержит только инициализацию, без бизнес-логики

### 2. pages/ - Страницы (роуты)

**Назначение:** Композиция страниц из features и entities.

**Структура:**
```
pages/
├── home/
│   └── index.jsx
├── about/
│   └── index.jsx
├── login/
│   └── index.jsx
├── registration/
│   └── index.jsx
├── profile/
│   └── index.jsx
└── schedule/
    └── index.jsx
```

**Правила:**
- Может импортировать из `features`, `entities`, `shared`
- НЕ содержит бизнес-логику (только композиция)
- НЕ содержит API вызовы
- Тонкие компоненты-обертки

**Пример:**
```javascript
// pages/login/index.jsx
import { LoginForm } from '../../features/auth';

export const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};
```

### 3. features/ - Бизнес-фичи

**Назначение:** Завершенные пользовательские сценарии (действия).

**Структура фичи:**
```
features/
└── auth/
    ├── ui/                 # UI компоненты фичи
    │   ├── login-form.jsx
    │   └── register-form.jsx
    ├── model/              # Бизнес-логика
    │   └── use-auth.js
    ├── api/                # API запросы фичи
    │   └── auth-api.js
    └── index.js            # Public API (экспорты)
```

**Текущие фичи:**
- `auth` - авторизация и регистрация
- `book-class` - бронирование занятия
- `leave-review` - создание и редактирование отзыва
- `filter-schedule` - фильтрация расписания

**Правила:**
- Может импортировать из `entities` и `shared`
- НЕ может импортировать из других `features`
- НЕ может импортировать из `pages` и `app`
- Изолирована от других фич

**Пример:**
```javascript
// features/auth/ui/login-form.jsx
import { useAuth } from '../model/use-auth';
import { authApi } from '../api/auth-api';

export const LoginForm = () => {
  const { login } = useAuth();
  // UI компонент фичи
};
```

### 4. entities/ - Бизнес-сущности

**Назначение:** Бизнес-объекты приложения (модели данных).

**Структура сущности:**
```
entities/
└── teacher/
    ├── ui/                 # UI компоненты сущности
    │   └── teacher-card.jsx
    ├── model/              # Бизнес-логика сущности
    │   └── use-teachers.js
    ├── api/                # API запросы сущности
    │   └── teachers-api.js
    └── index.js            # Public API
```

**Текущие сущности:**
- `user` - пользователь
- `teacher` - преподаватель
- `dance-style` - стиль танца
- `booking` - бронирование
- `review` - отзыв
- `schedule-class` - занятие в расписании

**Правила:**
- Может импортировать только из `shared`
- НЕ может импортировать из `features`, `pages`, `app`
- НЕ может импортировать из других `entities`
- Переиспользуется в разных фичах

**Пример:**
```javascript
// entities/teacher/model/use-teachers.js
import { useQuery } from '@tanstack/react-query';
import { teachersApi } from '../api/teachers-api';

export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: teachersApi.getTeachers,
  });
};
```

### 5. shared/ - Переиспользуемый код

**Назначение:** Код, не зависящий от бизнес-логики.

**Структура:**
```
shared/
├── ui/                     # UI Kit (компоненты)
│   ├── header/
│   ├── footer/
│   ├── banner/
│   └── index.js
├── lib/                    # Обертки библиотек
│   ├── react-query/
│   └── react-router/
├── api/                    # Базовая конфигурация API
│   └── base-api.js
├── utils/                  # Утилиты
│   └── image-loader.js
└── config/                 # Константы
    └── constants.js
```

**Правила:**
- НЕ импортирует из других слоев
- Полностью независим от бизнес-логики
- Может использоваться везде

## Правила импортов

### Схема зависимостей

```
app
 ↑
pages
 ↑
features
 ↑
entities
 ↑
shared
```

### Правила

1. **app** → может импортировать из всех слоев
2. **pages** → может импортировать из `features`, `entities`, `shared`
3. **features** → может импортировать из `entities`, `shared`
4. **entities** → может импортировать из `shared`
5. **shared** → НЕ импортирует из других слоев

### Запрещенные импорты

```javascript
// ❌ НЕПРАВИЛЬНО
// features/auth/ui/login-form.jsx
import { SomeFeature } from '../../features/other-feature'; // Запрещено!

// entities/teacher/model/use-teachers.js
import { useAuth } from '../../features/auth'; // Запрещено!

// shared/utils/format-date.js
import { useTeachers } from '../../entities/teacher'; // Запрещено!
```

### Разрешенные импорты

```javascript
// ✅ ПРАВИЛЬНО
// pages/login/index.jsx
import { LoginForm } from '../../features/auth';
import { useAuth } from '../../features/auth';

// features/book-class/ui/book-button.jsx
import { useBookings } from '../../entities/booking';
import { Button } from '../../shared/ui/button';

// entities/teacher/model/use-teachers.js
import { API_BASE } from '../../shared/api/base-api';
```

## Организация кода внутри фичи/сущности

### Структура

```
feature-name/
├── ui/              # UI компоненты
├── model/           # Бизнес-логика, хуки
├── api/             # API запросы (если нужны)
└── index.js         # Public API (только экспорты)
```

### Public API

Каждая фича/сущность должна экспортировать только через `index.js`:

```javascript
// features/auth/index.js
export { LoginForm } from './ui/login-form';
export { RegisterForm } from './ui/register-form';
export { useAuth } from './model/use-auth';
```

**Использование:**
```javascript
// ✅ Правильно
import { LoginForm, useAuth } from '../../features/auth';

// ❌ Неправильно
import { LoginForm } from '../../features/auth/ui/login-form';
```

## Примеры организации

### Пример 1: Фича авторизации

```
features/auth/
├── ui/
│   ├── login-form.jsx        # Форма входа
│   └── register-form.jsx      # Форма регистрации
├── model/
│   └── use-auth.js           # Хук для работы с авторизацией
├── api/
│   └── auth-api.js           # API запросы (getUsers, postUser)
└── index.js                  # Экспорт: LoginForm, RegisterForm, useAuth
```

### Пример 2: Сущность преподавателя

```
entities/teacher/
├── ui/
│   └── teacher-card.jsx      # Карточка преподавателя
├── model/
│   └── use-teachers.js      # Хук для получения списка преподавателей
├── api/
│   └── teachers-api.js      # API запросы (getTeachers)
└── index.js                 # Экспорт: TeacherCard, useTeachers
```

## Соглашения об именовании

См. [NAMING_GUIDELINES.md](./NAMING_GUIDELINES.md)

## Миграция на новую архитектуру

Процесс миграции описан в [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)

## Дополнительные ресурсы

- [Feature-Sliced Design документация](https://feature-sliced.design/)
- [FSD на GitHub](https://github.com/feature-sliced/documentation)

---

**Последнее обновление:** Декабрь 2025

