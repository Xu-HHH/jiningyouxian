# 官网 2 - 项目协作规范

本文件为 AI 编码助手（Agent）提供项目上下文，帮助理解项目结构、技术栈和工作约定。

## 项目概述

企业官网项目，前后端分离架构：
- 后端：Django 提供 API 和管理后台
- 前端：Vue 3 + Vite 构建单页应用
- 管理后台：simple-ui（Django Admin 美化框架）

## 技术栈

| 层 | 技术 | 版本 |
|---|---|---|
| 后端框架 | Django | 6.1 |
| 后台管理 | django-simpleui | 2026.1.13 |
| 前端框架 | Vue 3 + Vite | Vue 3.x / Vite 8.x |
| 语言 | Python | 3.14 |
| 语言 | JavaScript/TypeScript | ES2024+ |
| 数据库 | SQLite (开发) | - |
| 包管理 | pip / npm | - |

## 目录结构

```
官网 2/
├── AGENTS.md               # 本文件 - Agent 协作规范
├── .venv/                  # Python 虚拟环境（不要提交）
│
├── website/                # Django 后端项目
│   ├── manage.py
│   ├── db.sqlite3          # SQLite 数据库（不要提交）
│   ├── website/            # 项目配置包
│   │   ├── settings.py     # Django 设置（含 simpleui 注册）
│   │   ├── urls.py         # 项目路由
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── home/               # 主应用
│   │   ├── views.py        # 视图
│   │   ├── urls.py         # 应用路由
│   │   ├── models.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   └── migrations/
│   └── templates/
│       └── home/
│           └── index.html  # 首页模板（Vue SPA 入口）
│
└── frontend/               # Vue 前端项目
    ├── index.html          # Vite 入口
    ├── package.json
    ├── vite.config.js
    ├── src/
    │   ├── main.js         # Vue 入口
    │   ├── App.vue         # 根组件
    │   ├── style.css       # 全局样式
    │   ├── components/     # 可复用组件
    │   └── assets/         # 静态资源
    └── public/             # 公共资源
```

## 运行方式

### 后端（Django）

```powershell
cd "D:\Documents\ChatGPT\官网 2\website"
..\.venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
```

- 开发服务器：`http://127.0.0.1:8000/`
- 管理后台：`http://127.0.0.1:8000/admin/`（simple-ui 界面，中文）
- 超级管理员：`admin` / `admin`

### 前端（Vue）

```powershell
cd "D:\Documents\ChatGPT\官网 2\frontend"
npm install
npm run dev
```

- 开发服务器：`http://localhost:5173/`

## 关键配置说明

### settings.py 注意事项

- `simpleui` 必须排在 `django.contrib.admin` **前面**，否则其模板无法覆盖默认后台
- `LANGUAGE_CODE = 'zh-hans'`，`TIME_ZONE = 'Asia/Shanghai'`
- 模板目录：`BASE_DIR / 'templates'`（项目级模板）

### 数据库

- 开发使用 SQLite，数据库文件位于 `website/db.sqlite3`
- 修改 models 后需执行：`python manage.py makemigrations && python manage.py migrate`

## 代码约定

- Python：遵循 PEP 8，使用 snake_case
- Vue：组件文件使用 PascalCase（如 `MyComponent.vue`），文件名使用 kebab-case（如 `my-component.vue`）
- 路由命名：URL 路径使用 kebab-case（如 `/about-us/`）
- 注释语言：中文或英文均可，保持一致即可
- 新 API 接口放在 `home/views.py`，路由注册在 `home/urls.py`

## 环境陷阱

- 项目路径包含中文字符（`官网 2`），Python 3.14 的 `ensurepip` 在该路径下会失败，创建虚拟环境后需手动安装 pip
- 沙箱环境中 `TEMP` 目录可能无写入权限，安装 pip 时改用 `--target` 或 `get-pip.py` 方式
- Django 开发服务器在沙箱中需要手动指定端口 `0.0.0.0:8000` 以确保可访问
