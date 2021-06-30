const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const app = express();
const port = 8080

let upload = multer();

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lab10_employees'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Conexión exitosa");
});


app.get("/empleados/get", function (req, res) {

    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;

        let lista_empleados = [];
        for (var j = 0; j < results.length; j++) {

            employee = {
                'EmployeeID': results[j]['EmployeeID'],
                'LastName': results[j]['LastName'],
                'FirstName': results[j]['FirstName'],
                'Title': results[j]['Title']
            };
            lista_empleados.push(employee);
        }

        res.json(lista_empleados);
    });

});

app.get('/empleados/getManagerEmployees/:id', (req, res) => {
    let ReportsTo = req.params.id;

    let query = "SELECT * FROM lab10_employees.employees where ReportsTo = ?";
    let parameters = [ReportsTo];

    connection.query(query, parameters, function (err, results) {
        if (err) throw err;

        let lista_empleados = [];
        for (var j = 0; j < results.length; j++) {

            employee = {
                'EmployeeID': results[j]['EmployeeID'],
                'LastName': results[j]['LastName'],
                'FirstName': results[j]['FirstName'],
                'Title': results[j]['Title']
            };
            lista_empleados.push(employee);
        }

        res.json(lista_empleados);
    });
})

app.get('/empleados/getByTitle/:title', (req, res) => {
    let Title = req.params.title;

    let query = "SELECT * FROM lab10_employees.employees where Title = ?";
    let parameters = [Title];

    connection.query(query, parameters, function (err, results) {
        if (err) throw err;

        let lista_empleados = [];
        for (var j = 0; j < results.length; j++) {

            employee = {
                'EmployeeID': results[j]['EmployeeID'],
                'LastName': results[j]['LastName'],
                'FirstName': results[j]['FirstName'],
                'Title': results[j]['Title']
            };
            lista_empleados.push(employee);
        }

        res.json(lista_empleados);
    });
})



app.get('/productos/get', function (request, response) {
    let pagina = request.query.page;
    let p_q = 10 * pagina - 10;
    let query = "select  ProductID, ProductName, UnitPrice, UnitsInStock from products limit ?, ?";
    let params = [p_q, 10];

    connection.query(query, params, function (err, result) {
        if (err) throw err;
        response.json(result)
    });
});

