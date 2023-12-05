const mysql = require('mysql2');
const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bigland_back',
    namedPlaceholders: true,
    multipleStatements: true,
  charset: 'utf8mb4', // Menentukan charset yang mendukung karakter multibyte
  // Tambahkan parameter max_allowed_packet dengan ukuran yang sesuai
  // Misalnya, untuk set ukuran maksimum 64 MB, gunakan 64 * 1024 * 1024
  // max_allowed_packet: 64 * 1024 * 1024, 
   
  });


  module.exports = dbPool.promise();