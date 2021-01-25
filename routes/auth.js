const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../models/User")
import { generateToken } from './../middleware/authToken.js';
const { registerValidation, loginValidation } = require("../validation")

router.post("/register", async (req, res) => {
    try {
        // Validate data before creating a user
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: error.details[0].message
        })

        // Check if email already exists
        const foundEmail = await User.findOne({ email: req.body.email });
        if (foundEmail) return response.status(400).json({ message: 'That email is already taken', email: foundUser.email });

        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword
        })

        // Save new user
        const savedUser = await newUser.save();

        console.log('Account created', savedUser);
        response.status(201).json({
            message: 'Account created successfully!',
            email: savedUser.email,
        })
    } catch (err) {
        console.log(err);
        response.status(500).json(err)
    }
});

router.post("/login", async (req, res) => {
    try {
        // Validate data before logging in a user
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: error.details[0].message
        })

        // Find user based on email
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return response.status(401).json({ message: 'Account does not exist' });

        // If user exists validate password
        const passwordOk = await bcrypt.compare(req.body.password, userExist.password);
        if (!passwordOk) return response.status(401).json({ message: 'Password is incorrect' });

        // Generate JWT
        const token = generateToken(userExist._id);

        // Return token
        response.status(200).header("auth-token", token).json({ message: 'Login Success', token })
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

module.exports = router