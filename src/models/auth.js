const dbPool = require("../config/db.js");

const userIdValidateRegister = (body) => {
  const SQLQuery = `SELECT * FROM users WHERE user_id= '${body}';`;
  return dbPool.execute(SQLQuery);
};

const registerUser = (body, hashedPassword) => {
  const SQLQuery = `INSERT INTO users (user_name, user_id, password, role, org_id, uid, out_id, pass_init) VALUES ('${
    body.user_name
  }', '${body.user_id}', '${hashedPassword}', '${body.role}', '${
    body.org_id
  }', '${body.uid}', '${body.out_id === undefined ? 0 : body.out_id}', '${
    body.pass_init
  }');`;
  return dbPool.execute(SQLQuery);
};

const signIn = (body) => {
  const SQLQuery = `SELECT * FROM users WHERE mac_address = '${body.mac_address}';`;
  return dbPool.execute(SQLQuery);
};


const signInOutlet = (body) => {
  const SQLQuery = `SELECT * FROM users WHERE user_id= '${body.user_id}';`;
  return dbPool.execute(SQLQuery);
};

const getUserInfo = (decodedId) => {
  const SQLQuery = `SELECT * FROM users where id='${decodedId}'`;
  return dbPool.execute(SQLQuery);
};

const getListUserKamar = () => {
    const SQLQuery = `SELECT * FROM users WHERE role='kamar' ORDER BY id DESC LIMIT 25`;
    return dbPool.execute(SQLQuery);
}

const filterListKamar = (name) => {
    const SQLQuery = `SELECT * FROM users WHERE user_name LIKE '%${name}%'`;
    return dbPool.execute(SQLQuery);
}

const getUserById = (id) => {
  const SQLQuery = `SELECT * FROM users WHERE uid='${id}'`;
  return dbPool.execute(SQLQuery);
}

const setDeviceToken = (token, id) => {
  const SQLQuery = `UPDATE users SET token='${token}' WHERE uid='${id}'`;
  return dbPool.execute(SQLQuery);
}

const registerKamarDevice = (key, id) => {
  const SQLQuery = `UPDATE users SET mac_address='${key}' WHERE uid='${id}'`
  return dbPool.execute(SQLQuery);
}

const setInitialUser = (body) => {
  const SQLQuery = `UPDATE users SET is_wc='1', initial_user='${body.initial_user}' WHERE uid='${body.uid}'`;
  return dbPool.execute(SQLQuery);
}

const setPhone = (body) => {
  const SQLQuery = `UPDATE users SET phone='${body.phone}' WHERE uid='${body.uid}'`;
return dbPool.execute(SQLQuery);
}

const updateMacAddress = (mac) => {
  const SQLQuery = `UPDATE users SET mac_address='null' WHERE uid='${mac}'`;
  return dbPool.execute(SQLQuery);
}

const getUserByUid = (uid) => {
  const SQLQuery = `SELECT * from users WHERE uid='${uid}'`;
  return dbPool.execute(SQLQuery);
}

module.exports = {
  userIdValidateRegister,
  registerUser,
  signIn,
  getUserInfo,
  getListUserKamar,
  filterListKamar,
  getUserById,
  registerKamarDevice,
  setDeviceToken,
  setInitialUser,
  signInOutlet,
  setPhone,
  updateMacAddress,
  getUserByUid
};
