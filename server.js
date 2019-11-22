
"use strict";
const express = require("express");
const compression = require("compression");
const pg=require("pg").Pool;
const pool=new pg({host:'ec2-54-75-245-196.eu-west-1.compute.amazonaws.com',
                       database:'dbb6hea0bff55c',
                       user:'iojzljqzitzgvx',
                       password:'9ed18c7de54481d894345b2841301aae94be9fc58f300c73850cd1fad3ed1845',
                       port:'5432',ssl:'true'});


pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })

const _port = process.env.PORT || 5000;;
const _app_folder = 'dist/application';

const app = express();
app.use(compression());


// ---- SERVE STATIC FILES ---- //
app.post('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});
