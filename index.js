const express = require("express")
const app = express()

// Import Routes

const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")

dotenv.config()

// Connect to DB
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
)

// Middleware
// app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Route middlewares

app.listen(3000, () => console.log("Server up and running"))