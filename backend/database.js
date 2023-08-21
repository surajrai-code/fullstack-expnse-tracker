const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user: 'root',
    password : 'root',
    database:"details"
})
module.exports=pool.promise();