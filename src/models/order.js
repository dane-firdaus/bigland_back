const dbPool = require("../config/db.js");

const createOrder = (body) => {
    const SQLQuery = `INSERT INTO orders (order_number, kamar, status, outlet_id, kamar_id, total, date) VALUES ('${body.order_number}', '${body.kamar}', '${body.status}', '${body.outlet_id}', '${body.kamar_id}', '${body.total}', '${body.date}')`;
    return dbPool.execute(SQLQuery).then(res => { 
        const BaseData = JSON.stringify(res);
        const resultData = JSON.parse(BaseData);
        const valueData = resultData[0].insertId;
        return({valueData});

 }).catch(err => {console.log(err)});
}

const createChildOrder = (body) => {
    const SQLQuery = `INSERT INTO child_order (product_name, product_id, jumlah_order, harga, note, order_id, kamar_id ) VALUES ('${body.product_name}', '${body.product_id}', '${body.jumlah_order}', '${body.harga}', '${body.note}', '${body.order_id}', '${body.kamar_id}' )`;
    return dbPool.execute(SQLQuery);
}

const kamarGetOrder = (id) => {
    const SQLQuery = `SELECT * FROM orders WHERE kamar_id='${id}' ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const outletGetOrder = (id) => {
    const SQLQuery = `SELECT * FROM orders WHERE outlet_id='${id}' ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const getAnOrder = (id) => {
    const SQLQuery = `SELECT * FROM orders WHERE id='${id}'`;
    return dbPool.execute(SQLQuery);
}

const getChildFromAnOrder = (id) => {
    const SQLQuery = `SELECT * FROM child_order WHERE order_id='${id}'`;
    return dbPool.execute(SQLQuery);
}

const updateStatusOrderProccess = (id) => {
    const SQLQuery = `UPDATE orders SET status='proccess' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const updateStatusOrderDelivery = (id) => {
    const SQLQuery = `UPDATE orders SET status='delivery' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const updateStatusOrderReceived = (id) => {
    const SQLQuery = `UPDATE orders SET status='received' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const updateStatusOrderCanceled = (id) => {
    const SQLQuery = `UPDATE orders SET status='canceled' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const deleteOrder = (id) => {
    const SQLQuery = `DELETE FROM orders WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const deleteChildOrder = (id) => {
    const SQLQuery = `DELETE FROM child_order WHERE order_id=${id}`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    createOrder,
    createChildOrder,
    kamarGetOrder,
    outletGetOrder,
    getAnOrder,
    getChildFromAnOrder,
    updateStatusOrderProccess,
    updateStatusOrderDelivery,
    updateStatusOrderReceived,
    updateStatusOrderCanceled,
    deleteOrder,
    deleteChildOrder
}
