const dbPool = require("../config/db.js");


const saveMessage = (body) => {
    const SQLQuery = `INSERT INTO chat_child (pesan, profile_id, from_uid) VALUES('${body.pesan}', '${body.profile_id}', '${body.from_uid}')`;
    return dbPool.execute(SQLQuery);
}

const getMessageFrom = (profileId) => {
    const SQLQuery = `SELECT * FROM chat_child WHERE profile_id='${profileId}'`;
    return dbPool.execute(SQLQuery);
}

const getProfileId = (body) =>{
    const SQLQuery = `SELECT * FROM chat_profile WHERE uid='${body.uid}' AND to_uid='${body.to_uid}'`;
    return dbPool.execute(SQLQuery);
}

const createProfileChat = (body) => {
    const SQLQuery = `INSERT INTO chat_profile (profile_name, uid, to_uid) VALUES ('${body.profile_name}', '${body.uid}', '${body.to_uid}')`;
    return dbPool.execute(SQLQuery);
}



module.exports = {
    saveMessage,
    getMessageFrom,
    getProfileId,
    createProfileChat
}