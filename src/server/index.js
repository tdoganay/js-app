const express = require('express');
const app = express();

const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "april13",
	database: "jsapp"
})

app.post('/create-user', (req,res)=> {
	console.log(req.body);
	db.query(`INSERT INTO users (username,email,password) VALUES ('${req.body.username}','${req.body.email}','${req.body.password}')`, (err,data)=> {
		if (err) return res.json(err);
		return res.json({userStatus: "created"});
	});
});

app.post('/login-user', (req,res)=> {
	console.log(req.body);
	db.query(`SELECT * FROM users WHERE email='${req.body.username}' AND password='${req.body.email}'`, (err,data)=> {
		if (err) return res.json(err);
		return res.json({userStatus: "loggedIn"});
	});
});

app.get('/', (req,res)=> {
	return res.json("HELLO WORLD");
});

app.listen(3500, () => {
	console.log("SERVER RUNNING");
});
