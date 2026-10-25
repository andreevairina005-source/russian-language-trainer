# Публикация проекта на GitHub

## 1. Подготовьте папку

Скачайте архив проекта, распакуйте его и откройте папку `russian-language-trainer`. Загружать нужно содержимое этой папки, а не сам ZIP-файл.

Не загружайте старый DjVu/PDF-учебник, `.env`, пароли, ключи, `node_modules` и папку `dist`.

## 2. Создайте репозиторий на сайте GitHub

1. Войдите на [github.com](https://github.com/).
2. В правом верхнем углу нажмите **+**.
3. Выберите **New repository**.
4. В поле **Repository name** введите `russian-language-trainer`.
5. В описании напишите: `Интерактивный тренажёр русского языка для 7–8 классов`.
6. Выберите **Private**.
7. Не ставьте галочки **Add a README file**, **Add .gitignore** и **Choose a license** — эти файлы уже подготовлены.
8. Нажмите **Create repository**.

## 3А. Надёжный способ: Git Bash или Terminal

Этот способ сохраняет скрытые файлы `.gitattributes` и `.github/workflows/ci.yml`.

1. Откройте Git Bash в Windows или Terminal в macOS/Linux.
2. Перейдите в распакованную папку проекта:

```bash
cd путь/к/russian-language-trainer
```

В Windows пример может выглядеть так:

```bash
cd /c/Users/Мария/Downloads/russian-language-trainer
```

3. Выполните команды по очереди:

```bash
git init -b main
git add .
git commit -m "Initial Russian language trainer prototype"
git remote add origin https://github.com/ВАШ_ЛОГИН/russian-language-trainer.git
git push -u origin main
```

В последней команде замените `ВАШ_ЛОГИН` на свой логин GitHub. Если Git попросит войти, используйте окно авторизации GitHub или персональный токен, но не вставляйте токен в файлы проекта.

## 3Б. Только через веб-сайт GitHub

GitHub позволяет выбрать **Add file → Upload files** и перетащить файлы в окно. В браузере можно загружать не более 100 файлов одновременно, поэтому текущий архив из более чем 100 небольших файлов нужно загружать двумя партиями.

1. Откройте созданный репозиторий.
2. Нажмите **Add file**.
3. Выберите **Upload files**.
4. Перетащите содержимое распакованной папки, не сам ZIP.
5. Если GitHub показывает больше 100 файлов, загрузите сначала первую часть, нажмите **Commit changes**, затем повторите **Add file → Upload files** для оставшихся файлов.
6. В поле сообщения укажите `Initial Russian language trainer prototype`.
7. Выберите **Commit directly to the main branch** и нажмите **Commit changes**.

Веб-загрузка может не показать скрытые файлы. Если `.github/workflows/ci.yml` не загрузился, создайте его вручную: **Add file → Create new file**, в имени укажите `.github/workflows/ci.yml`, затем вставьте содержимое одноимённого файла из распакованного проекта. Для `.gitattributes` используйте тот же способ.

## 4. Проверьте результат

На вкладке **Code** должны быть видны `package.json`, папки `client`, `server`, `drizzle`, `shared`, а также `README.md`. На вкладке **Actions** должен появиться workflow **CI**. Он проверяет типы, production-сборку и тесты.

## 5. Локальный запуск после загрузки

На компьютере с установленными Node.js 20+ и pnpm 10+ выполните:

```bash
git clone https://github.com/ВАШ_ЛОГИН/russian-language-trainer.git
cd russian-language-trainer
pnpm install --frozen-lockfile
pnpm dev
```

Проверка качества:

```bash
pnpm check
pnpm build
pnpm test
```

## Важно

GitHub хранит исходный код, но не заменяет сервер базы данных и авторизации. Для полноценного приложения отдельно настраиваются хостинг backend, база данных и секреты. Файл `.env` нельзя загружать в репозиторий.
