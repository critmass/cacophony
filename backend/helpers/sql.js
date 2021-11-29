// this was borrowed and modified from Express Jobly project

const { BadRequestError } = require("../expressError");

// This parses an object to create a sql string and values for
// creating the "where" part of the sql string

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  const values = []
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.reduce( (reducedKeys, key, i) => {
    if(dataToUpdate[key] != undefined) {
      reducedKeys.push(key)
      values.push(
        Object.values(dataToUpdate)[i]
      )
    }
    return reducedKeys
  },[]).map((colName, idx) =>
            `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return { setCols: cols.join(", "), values };
}

module.exports = { sqlForPartialUpdate };
