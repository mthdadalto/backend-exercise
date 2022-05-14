var express = require('express');
var router = express.Router();
var db = require(__basedir + "/db.js");

//pair vwap SQL queries
var getLastSingleVwapQuery = "SELECT `pair`, `vwap` FROM `market_price` WHERE `pair` LIKE ? ORDER BY `startTime` DESC LIMIT 1";

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

//ETHUSD pair vwap
router.get('/ETHUSD', (req, res) => {
    processLastSingleVwap(res, "ETH/USD");
});

module.exports = router;