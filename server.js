
"use strict";
const express = require("express");
const compression = require("compression");
const pg=require("pg").Pool;
const pool=new pg({host:'ec2-54-225-195-3.compute-1.amazonaws.com',
                       database:'d5chk7n9t49iu5',
                       user:'ykbmdknkahnjen',
                       password:'f0d3555952350a1a428baf233e4d10157a6f8e11e7ad58059c832cff5626bbdc',
                       port:'5432',ssl:'true'});


pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })

const _port = process.env.PORT || 5000;
const _app_folder = 'dist/';

const app = express();
app.use(compression());

app.use(express.static(__dirname + '/' ));
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
