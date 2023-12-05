const dbPool = require("../config/db.js");


const createPromo = (body) => {
    const SQLQuery = `INSERT INTO promo (title, description, image_uri, body, out_id) VALUES('${body.title}', '${body.description}', '${body.image_uri}', '${body.body}', '${body.out_id}')`;
    return dbPool.execute(SQLQuery);
}

const getPromoByOutletId = (id) => {
    const SQLQuery = `SELECT * FROM promo WHERE out_id='${id}' ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const getDetailsPromo = (id) => {
    const SQLQuery = `SELECT * FROM promo WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const getListPromo = () => {
    const SQLQuery = `SELECT * FROM promo ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}


const editPromo = (body, id) => {
    const SQLQuery = `UPDATE promo SET title='${body.title}', description='${body.description}', body='${body.body}', image_uri='${body.image_uri}' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const deletePromo = (id) => {
    const SQLQuery = `DELETE FROM promo WHERE id=${id}`;
    return dbPool.execute(SQLQuery); 
}

module.exports={
    createPromo,
    getPromoByOutletId,
    getDetailsPromo,
    getListPromo,
    editPromo,
    deletePromo
}