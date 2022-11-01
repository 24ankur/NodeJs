const express = require("express");
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const heplers = require('handlebars-helpers')();
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));
 
//templating engine
app.engine("hbs", engine({extname:".hbs"}));
app.set("view engine","hbs");

const mysqlConnection = mysql.createConnection({
    connectionLimit: 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
 });
 
mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB Connection Succeeded.');
    else
    console.log('DB connection failed \n Error :'+ JSON.stringify(err, undefined,2));
})


const routes= require('./server/routes/user');
app.use('/',routes);
app.listen(port, () => console.log("App Listening on port "+port));