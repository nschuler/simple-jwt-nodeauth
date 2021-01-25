import express from 'express';

import { authenticateToken } from '../middleware/authToken.js';
import { registerValidations, loginValidations } from './../middleware/validateUser.js';
import { register, login } from '../controllers/account.js'; // import request & response function

// initialize router
const router = express.Router();

router.post('/register', [...registerValidations], register); // current path: http://localhost:8080/api/account/register
router.post('/login', [...loginValidations], login); // current path: http://localhost:8080/api/account/login

export default router;