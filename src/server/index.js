require('dotenv').config();

const express = require('express');
const app = express();

const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const ghClientId = process.env.GITHUB_CLIENT_ID;
const ghClientSecret = process.env.GITHUB_CLIENT_SECRET;
const port = Number(process.env.PORT) || 3500;
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const client = axios.create({
	baseURL: 'https://github.com',
	timeout: 5000,
});

app.use(cors({
	origin: corsOrigins,
	credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE || 'jsapp',
});

app.post('/create-user', (req, res) => {
	const { username, email, password } = req.body;
	db.query(
		'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
		[username, email, password],
		(err) => {
			if (err) return res.json(err);
			return res.json({ userStatus: 'created' });
		},
	);
});

app.post('/auth-user', async (req, res) => {
	const ghCode = req.body.ghCode;
	const ghAccessToken = req.body.ghAccessToken;
	if (!ghClientId || !ghClientSecret) {
		return res.status(500).json({ error: 'GitHub OAuth is not configured on the server' });
	}
	if (!ghAccessToken && ghCode) {
		try {
			const ghAuth = await client.post(
				'/login/oauth/access_token',
				{ client_id: ghClientId, client_secret: ghClientSecret, code: ghCode },
				{ headers: { Accept: 'application/json' } },
			);
			const { Octokit } = require('@octokit/rest');
			const octokit = new Octokit({ auth: ghAuth.data.access_token });
			const user = await octokit.rest.users.getAuthenticated();
			return res.json({ accessToken: ghAuth.data, ghUser: user.data });
		} catch (error) {
			return res.json({ error: error });
		}
	}
	return res.json({ error: 'Missing GitHub authorization code' });
});

app.get('/', (req, res) => {
	return res.json('HELLO WORLD!');
});

app.listen(port, () => {
	console.log(`SERVER RUNNING on ${port}`);
});
