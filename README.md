<p align="center">
    <h1 align="center">
        Writer
    </h1>
    <p align="center">게시글 CRUD API<a href="https://github.com/dimsssss/writer"></a>.</p>
</p>

<p align="center">
    <a href="">
        <img alt="license" src="https://img.shields.io/github/license/dimsssss/toy-intergration-test">
    </a>
    <a href="">
        <img alt="npm" src="https://img.shields.io/node/v-lts/npm?label=npm&logo=npm">
    </a>
    <a href="https://expressjs.com/">
        <img alt="express" src="https://img.shields.io/node/v-lts/express?label=express&logo=express">
    </a>
    <a href="https://jestjs.io/">
        <img alt="jest" src="https://img.shields.io/node/v-lts/express?label=jest&logo=jest">
    </a>
    <a href="https://sequelize.org/">
        <img alt="sequelize" src="https://img.shields.io/node/v-lts/sequelize?label=sequelize&logo=sequelize">
    </a>
    <a href="https://dl.circleci.com/status-badge/redirect/gh/dimsssss/writer/tree/main">
        <img alt="travis" src="https://dl.circleci.com/status-badge/img/gh/dimsssss/writer/tree/main.svg?style=svg">
    </a>
</p>

## 🏗 설치

### 1. 데이터베이스 설치

```shell
docker run --name=writer -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=writer -p 6603:3306 -d mysql:latest
```

### 2. 웹 서버 설치

```shell
git clone https://github.com/dimsssss/writer

cd writer

npm install
```

### 3. 환경 변수 설정

```
## .env 안에 들어갈 내용
DATABASE_USER = db계정
PASSWORD = db 패스워드
DATABASE = writer(임시)
HOST = db 호스트
DATABASE_PORT = db 포트
DIALECT = 사용하는 db 종류
TIMEZONE = 타임존 설정
MIN = 커넥션 풀 최소 갯수
MAX = 커넥션 풀 최대 갯수
SALT_ROUND = 패스워드 salt 변조 횟수
SALT = salt 값
WEATHER_BASE = api.weatherapi.com
WEATHER_API_KEY = 발급 받은 api key

```

### 4. 데이터베이스 마이그레이션

```shell
# migration
npx sequelize-cli db:migrate
```

## 🔍 이슈 사항들

https://www.notion.so/dimsss/API-b0c9d92221434031a566a74a517e3e04

## 🌐 API Document

https://app.swaggerhub.com/apis-docs/dimsssss/post-api/1.0.0

## 🧾 실행

```shell
npm run dev
```
