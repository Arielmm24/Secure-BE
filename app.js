import express from 'express'
import cors from 'cors'
import { getUsers, getUser, createUser } from './database.js'
import { getUser2, createUser2 } from './database.js'

    //npm run dev

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/', (req,res) =>{
    res.send('This is HomePage')
})

// GET

app.get('/users', async (req,res) =>{
    const users = await getUsers()
    res.send(users)
})

app.get('/users/:name', async (req,res) =>{
    const name = req.params.name
    const user = await getUser(name)
    if(user.length == 0)
        res.status(400).send('Cannot find user with those conditions')
    else
        res.send(user)
})

// POST

app.post('/users/', async (req,res) => {
    const { userName, password, email, phoneNumber} = req.body
    const user = await createUser(userName, password, email, phoneNumber)
    res.status(201).send(user)
})

app.use((err, req, res) =>{
    console.error(err.stack)
    res.status(500).send('Something Broken')
})

app.listen(8080,() => {
    console.log(' server is running on port 8080')
})