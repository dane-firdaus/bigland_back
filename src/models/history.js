const dbPool = require("../config/db.js");


const listHistory = (id) => {
    const SQLQuery = `SELECT * FROM orders WHERE status='received' AND outlet_id=${id} ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const getOrderDetails = (id) => {
    const SQLQuery = `SELECT * FROM orders WHERE id='${id}'`;
    return dbPool.execute(SQLQuery);
}

const getChildByOrder = (id) => {
    const SQLQuery = `SELECT * FROM child_order WHERE order_id='${id}'`;
    return dbPool.execute(SQLQuery);
}

module.exports={
    listHistory,
    getOrderDetails,
    getChildByOrder
}