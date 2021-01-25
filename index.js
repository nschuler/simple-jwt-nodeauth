const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")

// Initialize app
const app = express();
dotenv.config()

// Middlewares
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser
app.use(cors()); // enables http requests

// Connect to DB
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(CONNECTION_URL, DEPRECATED_FIX).catch((error) => console.log('❌ MongoDB:', error)); // listen for errors on initial connection
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('error', (error) => console.log('❌ MongoDB:', error)); // listen for errors after the connection is established (errors during the session)
mongoose.connection.on('disconnected', () => console.log('❌ MongoDB disconnected'));
mongoose.set('useCreateIndex', true);

// Routes
app.get('/', (req, res) => res.send('Simple JWT Node Auth API is Online'));

// server is listening for requests
app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`))