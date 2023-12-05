const dbPool = require("../config/db.js");

const getDetailsUser = (id) => {
    const SQLQuery = `SELECT * FROM users WHERE uid='${id}'`;
    return dbPool.execute(SQLQuery);
}

const getListOrder = (id) => {
    const SQLQuery = `SELECT * FROM child_order WHERE kamar_id='${id}'`
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getDetailsUser,
    getListOrder
}