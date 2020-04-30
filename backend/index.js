var express = require('express');
const bodyParser = require("body-parser");
// const Bcrypt = require("bcryptjs");
var mysql = require('mysql');
var app = express();
var cors = require('cors');
app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*-Config of database-*/
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "investor_management"
});
con.connect(function(err) {
    if (err) throw err;    
    /*---API for user---*/   
    app.post('/user', function (req, res) {            
      name = req.body.name;
      projectId = req.body.projectId
      investmentPercentage = req.body.investmentPercentage;
      query_add = "INSERT INTO investorinproject(projectId, investmentPercentage, name) VALUES ('" + projectId +"', '" + investmentPercentage +"','" + name +"');";
      con.query(query_add, function (err, result, fields) {
          if (err) throw err;          
      });
      res.sendStatus(200);      
    });

    app.get('/user', function(req, res){
      query_select = "SELECT * From investorinproject";
      con.query(query_select, function (err, result, fields) {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'content-type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');            
        res.contentType('application/json');
        myJSONstring = JSON.stringify(result);
        res.send(myJSONstring);
      });
    });
    
    app.get('/user_project/:pid', function(req, res){
      pid = req.params.pid;
      query_select = "SELECT * From user where PID = '"+ pid +"'";
      con.query(query_select, function (err, result, fields) {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'content-type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');            
        res.contentType('application/json');
        myJSONstring = JSON.stringify(result);
        res.send(myJSONstring);
      });
    });

    app.get('/user/:id', function(req, res){
      id = req.params.id;
      query_select = "SELECT * From user where ID = '"+ id +"'";
      con.query(query_select, function (err, result, fields) {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'content-type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');            
        res.contentType('application/json');
        myJSONstring = JSON.stringify(result);
        res.send(myJSONstring);
      });
    });
    //assign project for employee
    app.put('/assign_user/:id', function(req, res){
      id = req.params.id;
      name = req.body.name;      
      query_update = "UPDATE user SET PID = '"+ name +"' where ID = '"+ id +"'";
      con.query(query_update, function (err, result, fields) {
        if (err) throw err;
      });
      res.sendStatus(200);
    });
    //update information of employee
    app.put('/user/:id', function(req, res){
      id = req.params.id;
      name = req.body.name;
      phone = req.body.phone;
      birthday = req.body.birthday;     
      query_update = "UPDATE user SET name = '"+ name +"', phone = '"+ phone +"', birthday = '"+ birthday +"' where ID = '"+ id +"'";
      con.query(query_update, function (err, result, fields) {
        if (err) throw err;
      });
      res.sendStatus(200);
    });

    /*---API for project---*/ 
    app.post('/project', function (req, res) {      
      name = req.body.name;
      price = req.body.price; 
      description = req.body.description;
      query_add = "INSERT INTO project(name, price, description) VALUES ('" + name +"', '" + price +"', '" + description +"');";
      con.query(query_add, function (err, result, fields) {
          if (err) throw err;
      });
      res.sendStatus(200);      
    });
    app.get('/project', function(req, res){
      query_select = "SELECT * From project";
      con.query(query_select, function (err, result, fields) {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'content-type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');            
        res.contentType('application/json');
        myJSONstring = JSON.stringify(result);
        res.send(myJSONstring);
      });
    });    
    app.get('/project/:id', function(req, res){
      id = req.params.id;
      query_select = "SELECT * From project where PID = '"+ id +"'";
      con.query(query_select, function (err, result, fields) {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'content-type');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');            
        res.contentType('application/json');
        myJSONstring = JSON.stringify(result);
        res.send(myJSONstring);
      });
    });
    app.put('/project/:id', function(req, res){
      id = req.params.id;
      name = req.body.name;
      description = req.body.description;           
      query_update = "UPDATE project SET name = '"+ name +"', description = '"+ description +"' where PID = '"+ id +"'";
      con.query(query_update, function (err, result, fields) {
        if (err) throw err;
      });
      res.sendStatus(200);
    });

    /*-API for update profit-*/
    app.post('/profit', function(req,res){
      pid = req.body.pid;
      amount = req.body.amount;
      date = req.body.date;
      query_add = "INSERT INTO investorprofit(investorProjectId, amount, date) VALUES ('" + pid +"', '" + amount +"', '" + date +"');";
      con.query(query_add, function (err, result, fields) {
          if (err) throw err;
      });
      res.sendStatus(200); 
    })
});

app.listen(4201, function () {
    console.log('Server is listening...');
});
