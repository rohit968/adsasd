const connection = require('../database/db');
const util = require('util');

module.exports.connectionCommon = async (sql, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    const results = await query(sql)
    res.send(results);
    //return results;
  } catch {
    res.status(404).send(error.message);
  }
};