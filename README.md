# BLOG SERVER

This project was mainly for learning. I was learning this through youtube video by [Prawito Hudoro](https://www.youtube.com/@prawitohudoro/videos) 3 years ago. Check his channel through this [link](https://www.youtube.com/@prawitohudoro/videos), he is really good instructor. As times goes by, I finally have a time to update this repository. No fancy config such as eslint and prettier here, so you can understand it and beginner friendly.

### Technology used

- NodeJS
- Express
- Express Validator
- Jsonwebtoken
- Bcryptjs
- MongoDB

## Installation

### Clone

```
$ git clone https://github.com/rimamei/Mern-blog-server.git
$ cd Mern-blog-server
$ npm install
```

## Create Environment Variable

```
DATABASE_URI=
PORT=
JWT_ACCESS_SECRET=
JWT_EXPIRES_IN=
```

### Start Development Server

```
$ npm run dev
```

## API Endpoint

### Authentication

| No  | HTTP Method | URI                   | Operation     |
| --- | ----------- | --------------------- | ------------- |
| 1   | POST        | /api/v1/auth/register | Register user |
| 2   | POST        | /api/v1/auth/login    | Login User    |

### Blog

| No  | HTTP Method | URI              | Operation             |
| --- | ----------- | ---------------- | --------------------- |
| 1   | GET         | /api/v1/blog     | Get all blog data     |
| 2   | GET         | /api/v1/blog/:id | Get detail blog by id |
| 3   | POST        | /api/v1/blog     | Create blog           |
| 4   | DELETE      | /api/v1/blog/:id | Delete blog           |
| 5   | PUT         | /api/v1/blog/:id | Edit blog             |

---

Copyright © 2024 [Rima Mei Handayani](https://github.com/rimamei/)
