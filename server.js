
"use strict";
const express = require("express");
const compression = require("compression");
const pg=require("pg").Pool;
const f=require("fs");
const pool=new pg({host:'ec2-54-225-195-3.compute-1.amazonaws.com',
                       database:'d5chk7n9t49iu5',
                       user:'ykbmdknkahnjen',
                       password:'f0d3555952350a1a428baf233e4d10157a6f8e11e7ad58059c832cff5626bbdc',
                       port:'5432',ssl:'true'});

var data;





const _port = process.env.PORT || 5000;
const _app_folder = 'dist/';

const app = express();
app.use(compression());

app.use(express.static(__dirname + '/dist' ));
// ---- SERVE STATIC FILES ---- //
app.post('*.*', express.static(_app_folder, {maxAge: '1y'}));

app.get("/api/test",function(req,res)
{
        pool.query("SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id,name)) As properties FROM trees_test As lg) As f) As fc", (err1, res1) => 
        {
        if(err1) {
                return console.log(err1);
            }
            res.send(res1.rows[0].row_to_json)
        
        f.writeFile("./dist/a.geojson",JSON.stringify(res1.rows[0].row_to_json), function(err) {

            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
        
    
        pool.end()
        })
}
);

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});
