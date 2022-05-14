// sertup service
global.__basedir = __dirname;
var express = require("express");
var server = express();

//api imports
var ohlc = require('./routes/fx/ohlc.js');

var PORT = 3000;
server.listen(PORT, () => {
    console.log("HTTP Service running on port "+PORT);
});


//ENDPOINTS
server.get("/", (req, res) => {
    res.status(404);
});

//routed eps
server.use('/api/fx/ohlc', ohlc);

//default to 404
server.use((req, res) => {
    res.status(404);
});