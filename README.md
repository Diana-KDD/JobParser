# Парсинг и анализ вакансий с сайта [startup.jobs](https://startup.jobs/)

Приложение собирает справочные данные (страны и роли) с сайта startup jobs, хранит их в PostgreSQL и предоставляет API для клиента. В планах — парсинг самих вакансий и аналитика по ним.

## Стек технологий

**Backend:**

- Node.js
- Express
- PostgreSQL
- `pg` — драйвер БД
- `dotenv` — переменные окружения
- `cors` — кросс-доменные запросы

**Frontend:**

- React 19
- Vite

**Инфраструктура:**

- Docker + Docker Compose
- PostgreSQL 18 (в контейнере)

## Реализовано

- Получение списка стран по API сайта
- Сохранение стран в БД (UPSERT по `country_code`)
- Получение списка ролей по API сайта
- Сохранение ролей в БД (UPSERT по `slug`)
- Синхронизация справочников при старте приложения (идемпотентно — повторный запуск не создаёт дубликатов)
- REST API для получения списка стран и ролей
- React-клиент с выпадающими списками стран и ролей
- Запуск всего стека через `docker compose up`

## Запуск

### Требования

- Docker Desktop
- Node.js (для локальной разработки без Docker)

### Через Docker

1. Создать файл `.env` в корне проекта:

   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=jobparser
   API_KEY=your_api_key
   CURL_COUNTRIES=https://api.startup.jobs/v1/locations
   CURL_ROLE=https://api.startup.jobs/v1/roles
   ```

2. Запустить:

   ```
   docker compose up --build -d
   ```

3. Открыть:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

4. Остановить:

   ```
   docker compose down
   ```

Данные БД сохраняются в volume `postgres_data` и не теряются при перезапуске.

### Локально

1. Установить зависимости:

   ```
   cd Server && npm install
   cd ../client && npm install
   ```

2. Поднять PostgreSQL локально и создать БД.

3. Создать `.env` в `Server/` с теми же переменными.

4. Запустить сервер:

   ```
   cd Server && node src/app.js
   ```

5. Запустить клиент:

   ```
   cd client && npm run dev
   ```

## БД

### `dates_latest_updates`

Таблица для отслеживания последних обновлений справочников.

| Колонка    | Тип               |
| ---------- | ----------------- |
| id         | TEXT, PRIMARY KEY |
| name_table | TEXT, UNIQUE      |
| date       | DATE              |

### `countries`

Справочник стран.

| Колонка      | Тип                      |
| ------------ | ------------------------ |
| country_code | varchar(15), PRIMARY KEY |
| name         | TEXT                     |

### `roles`

Справочник ролей.

| Колонка     | Тип               |
| ----------- | ----------------- |
| id          | TEXT, PRIMARY KEY |
| title       | TEXT              |
| slug        | TEXT, UNIQUE      |
| parent_slug | TEXT, NULL        |

## Структура проекта

```
JobParser/
├── Server/                  # Backend (Express + PostgreSQL)
│   ├── src/
│   │   ├── config/          # Подключение к БД, инициализация таблиц
│   │   ├── controllers/     # Обработчики HTTP-запросов
│   │   ├── repositories/    # Работа с таблицами БД (SQL)
│   │   ├── services/        # Бизнес-логика (синхронизация справочников)
│   │   ├── parsing.js       # Запросы к API сайта
│   │   ├── routes/          # Маршруты Express
│   │   └── app.js           # Точка входа
│   ├── Dockerfile
│   └── .dockerignore
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # Компоненты (Form, Select)
│   │   └── App.jsx
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── .env                     # Секреты (не коммитится)
```

## Архитектура

- **`parsing`** — отправляет HTTP-запросы к API сайта, возвращает сырые данные.
- **`repositories`** — инкапсулируют SQL. Один файл — одна таблица.
- **`services`** — вызывают репозитории, считают статистику.
- **`controllers`** — принимают HTTP-запрос, вызывают сервис/репозиторий, формируют ответ.
- **`routes`** — связывают URL с контроллерами.
- **`config/init`** — создаёт таблицы при старте (idempotent, `CREATE TABLE IF NOT EXISTS`).

## API

| Метод | Путь             | Описание     |
| ----- | ---------------- | ------------ |
| GET   | `/api/countries` | Список стран |
| GET   | `/api/roles`     | Список ролей |

## Планы

- Парсинг самих вакансий (инкрементально, по фильтрам страны и роли)
- Аналитика: медиана зарплат, разбивка по формату работы
- Миграции БД (`node-pg-migrate`)
- Тесты (Jest / Vitest)
