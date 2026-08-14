# js-app

A React SPA with an Express API: GitHub OAuth sign-in, cookie-based session UI, and MySQL user records. The frontend was bootstrapped with Create React App and Tailwind; the API lives in `src/server`.

A production frontend build was also deployed with **AWS Amplify** (see the Amplify URL used as an OAuth redirect).

## Features

- GitHub OAuth login (authorization code → access token on the API)
- Navbar that switches between Sign In and the GitHub avatar menu
- Home view greets the authenticated GitHub username
- MySQL `users` table for local username/email/password records
- CORS configured for local dev and the Amplify host

## Architecture

```
Browser (CRA :3000)
    │  GitHub OAuth redirect with ?code=
    ▼
Express API (:3500)  →  GitHub token endpoint + Octokit
                     →  MySQL (jsapp.users)
```

| Path | Role |
| --- | --- |
| `src/App.js` | Router, login state, logout |
| `src/Navbar.js` | Tailwind/Headless UI nav and OAuth entry |
| `src/Login.js` | Exchanges the GitHub `code` with the API |
| `src/Home.js` | Signed-in greeting |
| `src/server/index.js` | Express: `/auth-user`, `/create-user` |

## Prerequisites

- Node.js 18+
- MySQL with a `jsapp` database and a `users` table:

```sql
CREATE DATABASE IF NOT EXISTS jsapp;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

- A [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) with callback URLs:
  - `http://localhost:3000/login`
  - your Amplify (or other hosted) `/login` URL, if you deploy the frontend

## Setup

1. Install the frontend and API:

```bash
npm install
cd src/server
npm install
cd ../..
```

2. Create env files from the templates (never commit the real files):

```bash
cp .env.example .env
cp src/server/.env.example src/server/.env
```

Set `REACT_APP_GITHUB_CLIENT_ID` in `.env` and `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` plus MySQL settings in `src/server/.env`.

3. Start MySQL so the API can connect.

## Run

The root `npm start` script launches the CRA dev server and nodemon for the API:

```bash
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3500](http://localhost:3500)

Or run them separately:

```bash
# terminal 1
npm start --prefix .   # CRA (or: npx react-scripts start)

# terminal 2
npx nodemon src/server/index.js
```

| Script | Purpose |
| --- | --- |
| `npm start` | CRA frontend + nodemon API |
| `npm run build` | Production frontend build |
| `npm test` | CRA test runner |

## Technologies

- **React 18** (Create React App) and **React Router 6**
- **Tailwind CSS**, **Headless UI**, **Heroicons**
- **Express** and **cors**
- **GitHub OAuth** via Octokit / axios
- **MySQL** (`mysql2`)
- **js-cookie** for client session cookies
- **AWS Amplify** for frontend hosting

## Security notes

OAuth client secrets and database passwords must live in environment variables, not source control. If those values were ever committed, rotate the GitHub OAuth client secret and the MySQL password before using the app again.
