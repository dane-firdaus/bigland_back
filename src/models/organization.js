const dbPool = require("../config/db.js");


const orgUserIdValidateRegister = (body) => {
    const SQLQuery = `SELECT * FROM organization WHERE user_id= '${body}';`;
    return dbPool.execute(SQLQuery);
  };


  const registerOrg = (body, hashedPassword) => {
    const SQLQuery = `INSERT INTO organization (name, user_id, password, org_id, status) VALUES ('${body.name}', '${body.user_id}', '${hashedPassword}', '${body.org_id}', '${body.status}' );`;
    return dbPool.execute(SQLQuery);
  };

  const signIn = (body) => {
    const SQLQuery = `SELECT * FROM organization WHERE user_id = '${body.user_id}';`;
    return dbPool.execute(SQLQuery);
  };

  const getOrgInfo = (decodedId) => {
    const SQLQuery = `SELECT * FROM organization where id='${decodedId}'`;
    return dbPool.execute(SQLQuery);
  };

  const updateStatusOrg = (body) => {
    const SQLQuery = `UPDATE organization SET status='${body.status}' WHERE user_id='${body.user_id}'`;
    return dbPool.execute(SQLQuery);
  }

  module.exports = {
    orgUserIdValidateRegister,
    registerOrg,
    signIn,
    getOrgInfo,
    updateStatusOrg
  }

