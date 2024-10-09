import express, { query } from 'express'
import cors from 'cors'
import { getUsers, getUser, createUser, modifyUser } from './database.js'
import { getCustomers, getCustomer, createCustomer } from './database.js'
import { getUser2, createUser2 } from './database.js'
import { getCustomer2, createCustomer2 } from './database.js'

    //npm run dev

const app = express()

app.use(express.json())
app.use(cors({
     origin: 'http://localhost:3000'
}))

app.get('/', (req,res) =>{
    res.send('This is HomePage')
})

// USERS Table
// GET

app.get('/users', async (req,res) =>{
    const users = await getUsers()
    res.send(users)
})

app.post('/login' , async (req, res) => {
    try{
        const {userName , password} = req.body
        const response = getUser2(userName,password)
        if (userName === response.userName && password === response.password){
            // res.status(200).json({message: "Object(s) Read Successfully", response })
            res.send("SUCCESS")
        } else {
            res.status(400).json({ message: "UNSuccessfully Registered", response})
        }
    } catch (error){
        res.status(500).json(error)
    }
})


// POST

app.post('/users/', async (req,res) => {
    const { userName, password, email, phoneNumber} = req.body

  if (!userName || !password || !email || !phoneNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
    try{
        const [result] = await createUser(userName, password, email, phoneNumber)

          if (result) {
            res.status(201).json({ message: `User ${result.userName} added successfully `, result });
          } else {
            res.status(400).json({ message: 'Failed to add User' });
          }
        } catch (error) {
          console.error('Error adding User:', error);
          res.status(500).json({ message: 'Server error', error: error.message });
        }

    })

    app.put('/users/', async (req, res) => {
        const { userName, currentPassword, newPassword } = req.body; // Extracting fields from the request body
    
        if (!userName || !currentPassword || !newPassword ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        try {
            const [result] = await modifyUser(userName, currentPassword, newPassword)
    
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: 'User updated successfully' });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    });


// CUSTOMERS Table
// Get
app.get('/customers', async (req,res) =>{
    const customers = await getCustomers()
    res.send(customers)
})

app.get('/customers/:name/:option', async (req,res) =>{
    try{
        const name = req.params.name
        const option = req.params.option
        const response = await getCustomer(name, option)
        if(response !== undefined)
            res.status(200).json({ message: "Object(s) Read Successfully", response })
        else
            res.status(404).json({ message: "UNSuccessfully Registered"})
    } catch (error){
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: "Error fetching customer data", error: error.message });
    }
})

// POST

app.post('/customers/', async (req,res) => {
    const { name, number, amount, createdBy} = req.body

  if (!name || !number || !amount || !createdBy) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
    try{
        const [result] = await createCustomer(name, number, amount, createdBy)

          if (result) {
            res.status(201).json({ message: `Customer ${result.name} added successfully by ${result.createdBy}`, result });
          } else {
            res.status(400).json({ message: 'Failed to add customer' });
          }
        } catch (error) {
          console.error('Error adding customer:', error);
          res.status(500).json({ message: 'Server error', error: error.message });
        }
    })

// app.use((err, req, res) =>{
//     console.error(err.stack)
//     res.status(500).send('Something Broken')
// })

app.listen(8080,() => {
    console.log(' server is running on port 8080')
})