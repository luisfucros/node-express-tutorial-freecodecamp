const express = require("express");
// const mongoose = require("mongoose");
// const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const connectDB = require("./db/connect.js");
const app = express();
const notFound = require('./middleware/not-found')
require("dotenv").config();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/products", productRoute);

app.use(notFound)

app.get("/", (req, res) => {
  res.json({status: 'ok'});
});

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
        console.log(`server is listening on port ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();  
