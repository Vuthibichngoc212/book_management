# Hướng Dẫn Dự Án

## Thông tin cơ bản

- **Node Version**: 18.20.3
- **Quản lý gói**: yarn
- **Project**: ReactJS với Vite và TypeScript

## Cấu trúc dự án

```
fe-base/
├── node_modules/            # Thư mục chứa các gói phụ thuộc của dự án
├── public/                  # Tài nguyên tĩnh (favicon, html, v.v.)
├── src/                     # Mã nguồn của ứng dụng
│   ├── assets/              # Tài nguyên tĩnh như hình ảnh, font chữ, v.v.
│   ├── components/          # Các thành phần dùng chung
│   ├── constants/           # Các hằng số sử dụng trong toàn bộ ứng dụng
│   ├── contexts/            # React Contexts cho quản lý trạng thái
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Các thành phần trang (mỗi route tương ứng với một trang)
│   ├── redux/               # Cấu hình Redux cho quản lý trạng thái
│   ├── routes/              # Định nghĩa và cấu hình các route
│   ├── sagas/               # Cấu hình Redux-Saga cho xử lý side effects
│   ├── services/            # Các lời gọi API và cấu hình
│   ├── styles/              # Các style toàn cầu và cụ thể cho từng thành phần
│   ├── types/               # Định nghĩa kiểu TypeScript
│   ├── utils/               # Các hàm tiện ích
│   ├── App.css              # Style global cho ứng dụng
│   ├── App.tsx              # Thành phần App chính
│   ├── index.css            # CSS cho index.html
│   ├── main.tsx             # Điểm đầu vào của ứng dụng React
│   └── vite-env.d.ts        # Định nghĩa biến môi trường cho Vite
├── .env                     # Các biến môi trường
├── .env.sample              # File mẫu cho các biến môi trường
├── .eslintrc.cjs            # Cấu hình ESLint
├── .gitignore               # Các file và thư mục bị bỏ qua bởi git
├── .prettierrc              # Cấu hình Prettier
├── index.html               # File HTML chính
├── package.json             # Các gói phụ thuộc và scripts của dự án
├── README.md                # Tài liệu hướng dẫn dự án
├── tsconfig.app.json        # Cấu hình TypeScript cho ứng dụng
├── tsconfig.json            # Cấu hình TypeScript cơ bản
├── tsconfig.node.json       # Cấu hình TypeScript cho Node.js
└── vite.config.ts           # Cấu hình Vite
```

## Cách chạy dự án

### Yêu cầu

Đảm bảo bạn đã cài đặt Node.js phiên bản 18.20.3 và yarn.

### Cài đặt các phụ thuộc

Chạy lệnh sau để cài đặt các phụ thuộc của dự án:

```bash
yarn install
```

### Chạy server phát triển

Để khởi động server phát triển, chạy lệnh:

```bash
yarn dev
```

Ứng dụng sẽ được khởi động tại `http://localhost:3000`.

### Build ứng dụng

Để tạo build cho sản xuất, chạy lệnh:

```bash
yarn build
```

Output build sẽ nằm trong thư mục `dist`.

### Linting

Để kiểm tra codebase, chạy lệnh:

```bash
yarn lint
```

### Định dạng code

Để định dạng lại codebase, chạy lệnh:

```bash
yarn lint:fix
```
