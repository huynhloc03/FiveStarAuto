import mysql from "mysql"
export const database = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root123",
    database:"car"
})