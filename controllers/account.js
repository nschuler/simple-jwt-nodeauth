import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from '../models/User.js';
import Token from '../models/Token.js';

import { generateAuthToken } from './../middleware/authToken.js';
import { randomTokenGen } from './../utils/generateToken.js';
import { passwordEncrypt  } from './../utils/passwordEncrypt.js';

export const register = async (req, res, next) => {
    try {
        // Validate data before creating a user
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) return res.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
        })

        // Check if email already exists
        const foundEmail = await User.findOne({ email: req.body.email });
        if (foundEmail) return res.status(400).json({ message: 'That email is already taken', email: foundUser.email });

        // Encrypt password
        const encryptedPassword = passwordEncrypt(req.body.password)

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

        // Generate token
        const token = await randomTokenGen(savedUser)
        if (!token) return res.status(400).json({ message: 'Failed to generate token' });

        res.status(201).json({
            message: 'Account created successfully!',
            data: savedUser,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
};

export const login = async (req, res, next) => {
    try {
        // Validate data before logging in a user
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) return res.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
        });

        // Find user based on email
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return res.status(401).json({ message: 'Account does not exist' });

        // If user exists validate password
        const passwordOk = await bcrypt.compare(req.body.password, userExist.password);
        if (!passwordOk) return res.status(401).json({ message: 'Password is incorrect' });

        // Generate JWT
        const token = generateAuthToken(userExist._id);

        // Return token
        res.status(200).header("auth-token", token).json({ message: 'Login Success', token })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const verify = async (req, res, next) => {
    try {
        // Validate data before verifying a user
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) return res.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
        });

        const tokenExist = await Token.findOne({ token: req.body.token })
        if (!tokenExist) return res.status(401).json({ message: 'Unable to find a matching token' });

        // Find user based on email
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return res.status(401).json({ message: 'Account does not exist' });

        if (userExist.isActive) return res.status(401).json({ message: "User already verified" })

        userExist.isActive = true;
        await userExist.save();

        return res.status(200).json({ message: "Successfully Verified Account" })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const resendToken = async (req, res, next) => {
    try {
        // Validate data before verifying a user
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) return res.status(400).json({
            message: 'Unable to resend Token Validation',
            errors: validationErrors.errors,
        });

        const { email } = req.body;

        if (error) return res.status(400).json({ 
            message: 'Unable to resend Token Validation',
            errors: error.details[0].message 
        })

        // Find user based on email
        const userExist = await User.findOne({ email });
        if (!userExist) return res.status(401).json({ message: 'Account does not exist' });

        if (userExist.isActive) return res.status(401).json({ message: "User already verified" })

        // Generate Token
        const token = await randomTokenGen(userExist);

        //Send email to user
        return res.status(200).json({ 
            message: "Successfully resent token", 
            data: token 
        })
    } catch (err) {
        console.log(err);
        resendToken.status(500).json(err);
    }
};

export const sendResetToken = async (req, res, next) => {
    try {
        // Validate data before verifying a user
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) return res.status(400).json({
            message: 'Unable to Send Reset Token',
            errors: validationErrors.errors,
        });

        const { email } = req.body;

        // Find user based on email
        const userExist = await User.findOne({ email });
        if (!userExist) return res.status(401).json({ message: 'Account does not exist' });

        // Generate Token
        const token = await randomTokenGen(userExist);

        //Send email to user
        return res.status(200).json({ 
            message: "Successfully sent token", 
            data: token 
        })
    } catch (err) {
        console.log(err);
        resendToken.status(500).json(err);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        // Validate data before verifying a user
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) return res.status(400).json({
            message: 'Invalid data, see response.data.errors for further information',
            errors: validationErrors.errors,
        });

        const { email, token, newPassword } = req.body;

        const tokenExist = await Token.findOne({ token: req.body.token })
        if (!tokenExist) return res.status(401).json({ message: 'Unable to find a matching token' });

        // Find user based on email
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return res.status(401).json({ message: 'Account does not exist' });

        // Emnsure new password is not the same as old
        const passwordCompare = await bcrypt.compare(
            newPassword,
            useExist.password
        )

        if (passwordCompare) return res.status(401).json({ message: 'Cannot use the same password again' });


        userExist.password = passwordEncrypt(newPassword);
        await userExist.save();

        return res.status(200).json({ message: "Successfully Reset Password" })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};