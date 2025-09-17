# Tournaments App

Сервис на **Node.js + TypeScript** для управления пользователями и
проведения турниров.

## Возможности

-   Регистрация пользователей
-   Запуск турниров
-   Проведение матчей (дуэлей) между участниками с рандомным
    определением победителя
-   Учёт мест участников в топе

## Требования

-   Node.js: 22 версия
-   PostgreSQL: 16 версия

## Установка

Клонируйте репозиторий:

``` bash
git clone https://github.com/xw1nchester/tournaments-app
cd tournaments-app
```

Скопируйте `.env.example` в `.env` и заполните его актуальными
значениями.

Установите зависимости:

``` bash
npm install
```

Компиляция TypeScript → JavaScript:

``` bash
npm run build
```

### Запуск

Режим разработки:

``` bash
npm run dev
```

Собранная версия:

``` bash
npm start
```

## Swagger документация

<http://localhost:8080/api-docs>