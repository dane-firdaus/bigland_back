const dbPool = require("../config/db.js");

const deleteOrder = (uid) => {
    const SQLQuery = `DELETE FROM orders WHERE kamar_id='${uid}'`;
    return dbPool.execute(SQLQuery);
}

const deleteChildOrder = (uid) => {
    const SQLQuery = `DELETE FROM child_order WHERE kamar_id='${uid}'`;
    return dbPool.execute(SQLQuery);
}

const getChatProfile = (uid) => {
    const SQLQuery = `SELECT * FROM chat_profile WHERE uid='${uid}'`;
    return dbPool.execute(SQLQuery);
}

const deleteChildChat = (id) => {
    const SQLQuery = `DELETE FROM chat_child WHERE profile_id='${id}'`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    deleteOrder,
    deleteChildOrder,
    getChatProfile,
    deleteChildChat
}