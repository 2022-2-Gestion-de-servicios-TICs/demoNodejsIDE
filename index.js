const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const e = require("express");
const app = express();

const conn = mysql.createConnection({
    database: "hr",
    user: "root",
    password: "root",
    host: "localhost",
    port: 3306
});

//análogo al getMapping
app.get("/persona", function (request, response) {
    console.log("new request");

    let nombre = request.query.nombre;
    let apellido = request.query.apellido;

    let respuesta = {
        nombre: nombre,
        apellido: apellido
    };
    response.json(respuesta);
});

app.get("/foto/:id/:fecha", (req, res) => {
    let id = parseInt(req.params.id, 10);
    let fecha = req.params.fecha;

    res.json({
        id: (id + 1),
        fecha: fecha
    });
});

app.get("/listaPersonas", (req, res) => {
    let lista = [{
        nombre: "david"
    }, {
        nombre: "cesar"
    }, {
        nombre: "pedro"
    }];
    res.json(lista);
});

app.get("/listaJobs", function (req, res) {

    let sql = "select * from jobs";
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log("query exitoso");
        /*for(let i = 0; i < result.length; i++){
            console.log(result[i]["job_title"]);
        }*/
        console.log(result);
        res.json({
            success: "ok",
            lista: result
        });
    });

});

//Cuando la cabecera es: x-www-form-urlencoded
app.post("/jobs", bodyParser.urlencoded({extended: true}), function (req, res) {
    let jobId = req.body.jobId;
    let jobTitle = req.body.jobTitle;
    let minSalary = req.body.minSalary;
    let maxSalary = req.body.maxSalary;
    console.log(jobId);
    console.log(jobTitle);
    console.log(minSalary);
    console.log(maxSalary);

    let sql = "insert into jobs (job_id, job_title, min_salary, max_salary) VALUES (?,?,?,?)";

    conn.query(sql, [jobId, jobTitle, minSalary, maxSalary], function (err, result, fields) {
        if (err) {
            console.error("error", err);
            res.json({success: "failure"});
        } else {
            res.json({success: "ok"});
        }
    });

});

//Cuando la cabecera es: raw -> json
app.post("/jobsJson", bodyParser.json(), function (req, res) {
    let jobId = req.body.jobId;
    let jobTitle = req.body.jobTitle;
    let minSalary = req.body.minSalary;
    let maxSalary = req.body.maxSalary;
    console.log(jobId);
    console.log(jobTitle);
    console.log(minSalary);
    console.log(maxSalary);

});


app.listen(3000, function () {
    console.log("servidor iniciado correctamente en el puerto 3000");
})

