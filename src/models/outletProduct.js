const dbPool = require("../config/db.js");


const createProduct = (body) => {
    const SQLQuery = `INSERT INTO product (name, description, tag, image_uri, out_id) VALUES('${body.name}', '${body.description}', '${body.tag}', '${body.image_uri}', '${body.out_id}')`;
    return dbPool.execute(SQLQuery);
}

const getProductList = (outId) => {
    const SQLQuery = `SELECT * FROM product WHERE out_id='${outId}' ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const createChildProduct = (body) => {
    const SQLQuery = `INSERT INTO child_product (name, description, tag, price, image_uri, product_id) VALUES('${body.name}', '${body.description}', '${body.tag}', '${body.price}', '${body.image_uri}', '${body.product_id}')`;
    return dbPool.execute(SQLQuery);
}

const childProductList = (id) => {
    const SQLQuery = `SELECT * FROM child_product WHERE product_id='${id}' ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const getProductDetails = (id) => {
    const SQLQuery = `SELECT * FROM product WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const getChildProductDetails = (id) => {
    const SQLQuery = `SELECT * FROM child_product WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const editProduct = (body, id) => {
    const SQLQuery = `UPDATE product SET name='${body.name}', description='${body.description}', tag='${body.tag}', image_uri='${body.image_uri}' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const editChildProduct = (body, id) => {
    const SQLQuery = `UPDATE child_product SET name='${body.name}', description='${body.description}', price='${body.price}', tag='${body.tag}', image_uri='${body.image_uri}' WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const deleteProduct = (id) => {
    const SQLQuery = `DELETE FROM product WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

const deleteChildProductWithProductId = (id) => {
    const SQLQuery = `DELETE FROM child_product WHERE product_id=${id}`;
    return dbPool.execute(SQLQuery);
}

const deleteChildProduct = (id) => {
    const SQLQuery = `DELETE FROM child_product WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    createProduct,
    getProductList,
    createChildProduct,
    childProductList,
    getProductDetails,
    editProduct,
    getChildProductDetails,
    editChildProduct,
    deleteProduct,
    deleteChildProductWithProductId,
    deleteChildProduct
}