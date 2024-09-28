import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { addUser, checkIfUserDetailExists } from './database.js'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(8000, () => {
    console.log("Server running on port 8000")
})

app.post("/api/register-user", async (req, res) => {
    let foundEmail = await checkIfUserDetailExists("email", req.body.email)
    if(foundEmail.length > 0) {
        res.send({ error: true, message: "That email is already taken." })
    } else {
        let hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
        addUser(req.body.firstName, req.body.lastName, req.body.email, hashedPassword)
        res.send({ error: false, message: "Account registered." })
    }
})