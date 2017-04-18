var express = require('express');
var request = require('request');
var fs = require('fs');

/*
 * To test: node cors_proxy.js
 * http://mssql01:3000/proxy?url=http://www.google.com
 */

var app = express();

app.use('/proxy', function(req, res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    var url = req.url.replace('/?url=','');
    console.log(url);
    req.pipe(request(url)).pipe(res);
});

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);