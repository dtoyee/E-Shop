import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { addUser, checkIfUserDetailExists } from './database.js'
import generateToken from './token.js'

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

app.post("/api/login-user", async (req, res) => {
    console.log(req.body)
    let email = req.body.email
    let password = req.body.password
    let foundUser = await checkIfUserDetailExists("email", email)

    if(foundUser.length > 0) {
        if(bcrypt.compareSync(password, foundUser[0].password)) {
            let userDetails = {
                id: foundUser[0].id,
                email: foundUser[0].email
            }
            let token = generateToken(userDetails)
            res.send({ success: true, user: userDetails, token: token })
        } else {
            res.send({ success: false, message: "Incorrect details." })
        }
    }  else {
        res.send({ success: false, message: "Incorrect details." })
    }
})