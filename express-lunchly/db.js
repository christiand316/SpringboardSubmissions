/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client("postgresql://postgres:zzz");

db.connect();

module.exports = db;
