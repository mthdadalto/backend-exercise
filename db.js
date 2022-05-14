var sqlite3 = require('sqlite3');

const DB_PATH = "db.sqlite3";

let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to "+DB_PATH)
    }
});

module.exports = db