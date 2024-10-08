import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { addOrder, addUser, changePassword, checkIfUserDetailExists, getOrder, getUserOrders } from './database.js'
import generateToken from './token.js'
import { v4 as uuidv4 } from 'uuid'

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
    let email = req.body.email
    let password = req.body.password
    let foundUser = await checkIfUserDetailExists("email", email)

    if(foundUser.length > 0) {
        if(bcrypt.compareSync(password, foundUser[0].password)) {
            let userDetails = {
                id: foundUser[0].id,
                email: foundUser[0].email,
                role: foundUser[0].role
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

app.post("/api/submit-order", (req, res) => {
    const orderNumber = uuidv4().substring(0, 8)
    let addOrderToDatabase = req.body.product.map(prod => {
        addOrder(orderNumber, req.body.userId, prod.product.title, prod.quantity, req.body.orderTotal)
    })

    if(addOrderToDatabase) {
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
})

app.get("/api/orders", async (req, res) => {
    res.send({ orders: await getUserOrders(req.query.user_id) })
})

app.get("/api/orders/get/", async (req, res) => {
    res.send({ order: await getOrder(req.query.order_id) })
})

app.post("/api/change-password", (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
    let passwordChange = changePassword(req.body.user_id, hashedPassword)
    if(passwordChange) {
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
})