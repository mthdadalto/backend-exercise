var express = require('express');
var router = express.Router();
var db = require(__basedir + "/db.js");

//pair vwap SQL queries
var getLastSingleVwapQuery = "SELECT `pair`, `vwap` FROM `market_price` WHERE `pair` LIKE ? ORDER BY `startTime` DESC LIMIT 1";
var getHistoricalDateMinMaxQuery = "SELECT `pair`, date(`startTime`, 'unixepoch') AS 'startDate', max(`high`) AS 'max', min(`low`) AS 'min' FROM `market_price` WHERE `pair` LIKE ? GROUP BY `startDate` ORDER BY `startDate` ASC";

//process a single pair vwap request
function processLastSingleVwap(res, pair) {
    db.get(getLastSingleVwapQuery, pair, (err, row) => {
        if (err) {
            res.status(400).json({ "err": err.message });
            return;
        }
        res.json(row);
    });
}

//process historical pair max and min on single dates request
function processHistoricalDateMinMax(res, pair) {
    db.all(getHistoricalDateMinMaxQuery, pair, (err, rows) => {
        if (err) {
            res.status(400).json({ "err": err.message });
            return;
        }

        var data = []
        rows.forEach((row) => {
            data.push([row.pair, row.startDate, row.max, row.min]);
        });
        res.json(data);
    });
}


//SINGLES pair vwap

//--- ETHUSD
router.get('/ETHUSD', (req, res) => {
    processLastSingleVwap(res, "ETH/USD");
});

//--- ETHGBP
router.get('/ETHGBP', (req, res) => {
    processLastSingleVwap(res, "ETH/GBP");
});


//HISTORICAL

//--- ETHUSD 
router.get('/ETHUSD/history', (req, res) => {
    processHistoricalDateMinMax(res, "ETH/USD");
});

//--- ETHGBP
router.get('/ETHGBP/history', (req, res) => {
    processHistoricalDateMinMax(res, "ETH/GBP");
});

module.exports = router;