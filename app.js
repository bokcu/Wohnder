const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

//https://stackabuse.com/node-js-express-examples-rendered-rest-and-static-websites/ // Gutes Beispiel
//https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm // Events
// Vue.js https://vuejs.org/v2/guide/

/*
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
*/
//EXCLUDE!

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

/**
 * API
 */


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

/**
 * STATIC FILES
 */
app.use('/', express.static('app'));

//Default every except api to ->
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + '/app/index.html'));
})

module.exports =app;

