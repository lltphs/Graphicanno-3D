# GVLAB Web Boilerplate

## Prerequisites

-   Cài đật docker theo hướng dẫn tại [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

-   Cài đặt npm theo hướng dẫn tại [github.com/nodesource](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)

-   Cài đật yarn theo hướng dẫn tại [classic.yarnpkg.com](https://classic.yarnpkg.com/en/docs/install#debian-stable)

## Development

Trên terminal chạy django:

-   Bước 1: Build docker-compose: `docker-compose -f docker-compose.dev.yml build`
-   Bước 2: Run docker-compose: `docker-compose -f docker-compose.dev.yml up --build`
-   Bước 3: Vô đường dẫn: `localhost/admin` để vào trang admin của django với username: `admin` và mật khẩu: `admin_password`

Trên terminal chạy react:

-   Bước 1: Cài npm package: `yarn install`
-   Bước 2: Run: `yarn run start`
-   Bước 3: Vô đường dẫn `localhost:3000` để vô trang đăng nhập của react.

## Production

-   Bước 1: Thêm đia chỉ ip của máy chủ vô 2 file: `.env` và `backend/.env.prod`

-   Bước 2: Chạy lệnh: `docker-compose -f docker-compose.prod.yml up --build`

-   Bước 3: Vô đường dẫn `localhost/admin` để vào trang đăng nhập của django với với username: `admin` và mật khẩu: `admin_password`

-   Bước 4: Vô đường dẫn `localhost` để vào trang chủ của react

## Project structure

### backend
-   Thư mục chứa source code phần backend
-   Các công nghệ sử dụng trong backend:
    -   django: đọc thêm document tại [docs.djangoproject.com](https://docs.djangoproject.com/en/3.1/)
    - django rest framework: đọc thêm document tại [www.django-rest-framework.org](https://www.django-rest-framework.org/)
    - JWT: đọc thêm document tại [django-rest-framework-simplejwt](https://github.com/SimpleJWT/django-rest-framework-simplejwt)
    - celery: đọc thêm document tại [celery](https://docs.celeryproject.org/en/stable/django/first-steps-with-django.html) (chưa hiện thực trong source code hiện tại)
    - ...


### frontend


    .
    ├── src
    │   ├── api
    │   ├── assets
    │   ├── components
    │   │   |-- common
    │   │   |-- ...
    │   ├── configs
    │   ├── store
    │   │   ├── actions
    │   │   ├── reducers
    │   │   ├── types
    │   ├── pages
    │   ├── App.tsx
    │   ├── index.tsx
    │   └...
    └...



- Thư mục chứa source code phần frontend:

- Các công nghẹ sử dụng trong frontend:
    - React-Typescript
        - context: kết hợp createContext và useReducer.
        - Hooks: useState, useEffect, useMemo, memo,...
    - Redux
    - eslint
    - husky và lint-staged

## Một số extension hữu ích  trong vscode:
- [Django](https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django)
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- [Auto rename tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [HTML Snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Tabnine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) (lưu ý: Extension yêu cầu máy cấu hình cao)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
