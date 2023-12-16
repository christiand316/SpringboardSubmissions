const { BadRequestError } = require("../expressError");


// This code will let us get arbitrary keys from an object and format it into a way that
// pgnode will accept, thus reducing the amount of code we need to write

//The first arg is the actual incoming data, and jsToSql is a way to convert
//the fields from what we expect our JS to pass into our SQL schema expects
//e.g. firstName -> first_name
//lastName -> last_name

// const jsSqlMap = new Map()
// jsSqlMap.set()

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
