import express from 'express'
import cors from 'cors'
import {connection} from './database.js'

const app = express()

// app.use(cors());

app.get('/' ,(req,res) => {
    res.send(" Home Page")
})
// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    connection.connect((err)=>{
        if(err) {
            throw err;
        } else {
        console.log("Database connected!");
        }
    })
}); 

// // Connect to the database
// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Connected to the MySQL database');
// });

// app.post('/register', (req, res) => {
//     const { userName, password, email, phoneNumber } = req.body;

//     const sql = 'INSERT INTO users (userName, password, email, phoneNumber) VALUES (?, ?, ?, ?)';
//     const values = [userName, password, email, phoneNumber];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'User registration failed', error: err });
//         }
//         return res.status(200).json({ message: 'User registered successfully', data: data });
//     });
// });

// // Route for handling login
// app.post('/login', (req, res) => {
//     const { userName, password } = req.body;

//     // SQL query to check if the user exists with the provided username and password
//     const sql = 'SELECT * FROM users WHERE userName = ? AND password = ?';

//     // Values to be passed into the query (preventing SQL injection)
//     const values = [userName, password];

//     // Perform the query
//     db.query(sql, values, (err, data) => {
//         if (err) {
//             // If there is an error, return a response with a failure message
//             return res.status(500).json({ message: 'Login Failed', error: err });
//         }
        
//         if (data.length === 0) {
//             // If no user is found, return a message indicating failure
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Successful login, return the user data
//         return res.status(200).json({ message: 'Login successful', user: data[0] });
//     });
// });

// app.put('/update-user', (req, res) => {
//     const { id, email } = req.body;

//     const sql = 'UPDATE users SET email = ? WHERE id = ?';
//     const values = [email, id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'Update failed', error: err });
//         }
//         return res.status(200).json({ message: 'User updated successfully', data: data });
//     });
// });


