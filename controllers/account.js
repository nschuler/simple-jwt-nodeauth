import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import User from '../models/User.js';
import Token from '../models/Token.js';

import { generateToken } from './../middleware/authToken.js';

export const register = async (req, res, next) => {
    try {
        // Validate data before creating a user
        const validationErrors = validationResult(request);
        if(!validationErrors.isEmpty()) return response.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
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

        // Generate and send token
        const token = await randomTokenGen()
        const userToken = new Token({ _userId: savedUser._id, token: token })
        await userToken.save()

        response.status(201).json({
            message: 'Account created successfully!',
            data: savedUser,
        })
    } catch (err) {
        console.log(err);
        response.status(500).json(err)
    }
};

export const login = async (req, res, next) => {
    try {
        // Validate data before logging in a user
        const validationErrors = validationResult(request);
        if(!validationErrors.isEmpty()) return response.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
        });

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
};

export const verify = async (req, res, next) => {
    try {
        // Validate data before verifying a user
        const validationErrors = validationResult(request);
        if(!validationErrors.isEmpty()) return response.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
        });

        const tokenExist = await Token.findOne({ token: req.body.token })
        if (!tokenExist) return response.status(401).json({ message: 'Unable to find a matching token' });

        // Find user based on email
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return response.status(401).json({ message: 'Account does not exist' });

        if (userExist.isActive) return res.status(401).json({ message: "User already verified" })

        userExist.isActive = true;
        await userExist.save();

        // Delete token if user is verified
        return res.status(200).json({ message: "Successfully Verified Account" })
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
};