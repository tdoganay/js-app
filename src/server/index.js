const config = require('./config')

const express = require('express');
const app = express();

const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const ghClientId = 'Iv1.e76c52da1877b77e';
const ghClientSecret = '43e1c381b7c4d7cc8c0a3b171ae57f11f3a9eaf7';

const axios = require('axios');
const client = axios.create({
            baseURL: "https://github.com",
            timeout: 5000,
        });

app.use(cors({
        origin: ['http://localhost:3000','https://main.dowohft4k2j57.amplifyapp.com', 'https://github.com'],
        credentials: true
    }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const db = mysql.createConnection({
	host: config.MYSQL_SERVER_HOSTNAME,
	user: config.MYSQL_SERVER_USER,
	password: config.MYSQL_SERVER_PASS,
	database: "jsapp"
});

app.post('/create-user', (req,res)=> {
	console.log(req.body);
	db.query(`INSERT INTO users (username,email,password) VALUES ('${req.body.username}','${req.body.email}','${req.body.password}')`, (err,data)=> {
		if (err) return res.json(err);
		return res.json({userStatus: "created"});
	});
});

app.post('/auth-user', async (req,res)=> {
	const ghCode = req.body.ghCode;
	const ghAccessToken = req.body.ghAccessToken;
    	if (!ghAccessToken && ghCode) {
	    try {
		    const ghAuth = await client.post('/login/oauth/access_token', {client_id: ghClientId, client_secret: ghClientSecret, code: ghCode}, {headers: {Accept: 'application/json'}});
		    console.log(ghAuth.data);
	    	const { Octokit } = require("@octokit/rest");
		    const octokit = new Octokit({auth: ghAuth.data.access_token});
		    const user = await octokit.rest.users.getAuthenticated();
		    console.log(user.data);
		    return res.json({accessToken: ghAuth.data, ghUser: user.data});
		} catch (error) {
			return res.json({error: error});
		}
	}

});

app.get('/', (req,res)=> {
	return res.json("HELLO WORLD!");
});

app.listen(3500, () => {
	console.log("SERVER RUNNING");
});
