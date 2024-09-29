const express = require("express")
require('express-async-errors')
const productRoute = require("./routes/product.route.js")
const authRoute = require('./routes/auth.route.js')
const userRoute = require('./routes/user.route.js')
const connectDB = require("./db/connect.js")
const app = express()
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')
require("dotenv").config()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.json({status: 'ok'})
});

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
