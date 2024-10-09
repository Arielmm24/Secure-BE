import mysql from 'mysql2'
import dotenv from 'dotenv'
import { query } from 'express'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {                               // GET all users
    const [rows] = await pool.query(" SELECT * FROM users")
    return rows
}

// Get User/s

export async function getUser(userName, password) {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE userName = ? password = ?
        `, [userName, password])
        if(rows[0])
            return rows[0]
        else
            return undefined
}

export async function getUser2(userName, password) {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE userName = '${userName}; or 1=1-- -' 
        AND password = '${password}'
    `);

    if (rows.length) {
        return rows[0];
    } else {
        return 'Cannot find any user with the mentioned name';
    }
}



// Create User

export async function createUser(userName, password, email, phone, isLock){
    const [result] = await pool.query(`
        INSERT INTO users (userName, password, email, phoneNumber, isLock)
        VALUES (?,?,?,?,?)
        `, [userName, password, email, phone, isLock])
        return (userName)
}

export async function createUser2(userName, password, email, phone){                  // weak against sqli
    const [result] = await pool.query(`
        INSERT INTO users (userName, password, email, phoneNumber, isLock)
        VALUES (${userName}, ${password}, ${email}, ${phone}, false]
        `)
        return getUser2(userName)
}

export async function modifyUser(userName, currentPassword, newPassword){
    const [result] = await pool.query(`
                UPDATE users 
                SET password = ? 
                WHERE userName = ?, password = ?`,
                [newPassword, userName, currentPassword]
            );
            return getUser(userName)
}

// CUSTOMERS 

export async function getCustomers() {                               // GET all users
    const [rows] = await pool.query(" SELECT * FROM customers")
    return rows
}

// Get Customer/s

export async function getCustomer(name, option) {
    const [rows] = await pool.query(`
        SELECT *
        FROM customers
        WHERE ${option} = ?
        `, [name])
        if(rows)
            return rows
        else
            return undefined
}

export async function getCustomer2(name, option) {                 //weak against sqli
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE ${option} = ${name}
        `)
        if(rows)
            return rows
        else
            return 'Cannot find any customer'
}


// Create Customer

export async function createCustomer(name, number, amount, createdBy){
    const [result] = await pool.query(`
        INSERT INTO customers (name, number, amount, createdBy)
        VALUES (?,?,?,?)
        `, [name, number, amount, createdBy])
        return getCustomer(name,'name')
}

export async function createCustomer2(name, number, amount, createdBy){                  // weak against sqli
    const [result] = await pool.query(`
        INSERT INTO customers (name, number, amount, createdBy)
        VALUES (${name}, ${number}, ${amount}, ${createdBy})
        `)
        return getCustomer2(name,name)
}
