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

export async function getUser(name) {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE userName = ?
        `, [name])
        return rows
        // if(rows.length)
        //     return rows[0]
        // else
        //     return 'Cannot find any user with the mention name'
}

export async function getUser2(name) {                 //weak against sqli
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE userName = ${name}
        `)
        if(rows.length)
            return rows[0]
        else
            return 'Cannot find any user with the mention name'
}


// Create User

export async function createUser(userName, password, email, phone){
    const [result] = await pool.query(`
        INSERT INTO users (userName, password, email, phoneNumber, isLock)
        VALUES (?,?,?,?,?)
        `, [userName, password, email, phone, 0])
        return getUser(userName)
}

export async function createUser2(userName, password, email, phone){                  // weak against sqli
    const [result] = await pool.query(`
        INSERT INTO users (userName, password, email, phoneNumber, isLock)
        VALUES (${userName}, ${password}, ${email}, ${phone}, false]
        `)
        return getUser2(userName)
}



// Examples

// const users = await getUsers()
// const users = await getUser('Ariel')
// const id = await createUser('test3', 1234, 'aaa', '050505')
// console.log(id)