const express = require('express');
const mysql = require('mysql');

//https://stackabuse.com/node-js-express-examples-rendered-rest-and-static-websites/ // Gutes Beispiel
//https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm // Events


//Create connectoin
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "secret",
    database: 'mysql'
});
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database connection established");
})

const app = express();

//CREATE DB
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('db created');
    })
})

app.get('/addUser', (req, res) => {
    let data = {}
    let sql = 'INSERT INTO db.User SET ?';
    let query = db.query(sql,data, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('user added');
    });
});

app.listen('8081', () => {console.log('server started on port 8081');});