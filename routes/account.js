import express from 'express';

import { authenticateToken } from '../middleware/authToken.js';
import { registerValidations, loginValidations, tokenValidations } from './../middleware/validateUser.js';
import { register, login, verify } from '../controllers/account.js'; // import request & response function

// initialize router
const router = express.Router();

router.post('/register', [...registerValidations], register); // current path: http://localhost:8080/api/account/register
router.post('/login', [...loginValidations], login); // current path: http://localhost:8080/api/account/login
router.post('/verify', [...tokenValidations], verify); // current path: http://localhost:8080/api/account/verify

export default router;