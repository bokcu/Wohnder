const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

//https://stackabuse.com/node-js-express-examples-rendered-rest-and-static-websites/ // Gutes Beispiel
//https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm // Events
// Vue.js https://vuejs.org/v2/guide/


//Create connectoin
const db = mysql.createConnection({
    host: "s224.goserver.host",
    user: "web234",
    password : "jsukj3jpLZCsVDE",
    database: 'web234_db2'
});
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database connection established");
})

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

//web234_db2.users
/*
id auto 
full name varchar(45) not Null
phone varchar(45) null
email varchar(45) not Null
gender varchar(1) null
photos blob null
age int(11) null

*/
app.get('/addUser', (req, res) => {
    for(var i = 0; i < 30; i++){
        var duude = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let data = {
            full_name: "duude"+duude,
            email: duude+"@test.com",
            gender: "m",
            age: "67"
        }
        let sql = 'INSERT INTO db.User SET ?';
        let query = db.query(sql,data, (err,result) => {
        if (err) throw err;
        console.log(result);
    });
    res.send('users added');

    }
    
    
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

