import express from 'express';

import { registerValidations, loginValidations, tokenValidations, resendTokenValidations, passwordResetValidations, passwordChangeValidations } from './../middleware/validateUser.js';
import { register, login, verify, resendToken, sendResetToken, resetPassword,changePassword } from '../controllers/account.js'; // import request & response function

// initialize router
const router = express.Router();

router.post('/register', [...registerValidations], register); // current path: http://localhost:8080/api/account/register
router.post('/login', [...loginValidations], login); // current path: http://localhost:8080/api/account/login
router.post('/verify', [...tokenValidations], verify); // current path: http://localhost:8080/api/account/verify
router.post('/resend-token', [...resendTokenValidations], resendToken); // current path: http://localhost:8080/api/account/resend-token
router.post('/send-password-reset', [...resendTokenValidations], sendResetToken); // current path: http://localhost:8080/api/account/send-password-reset
router.post('/password-reset', [...passwordResetValidations], resetPassword); // current path: http://localhost:8080/api/account/password-reset
router.post('/change-password', [...passwordChangeValidations], changePassword); // current path: http://localhost:8080/api/account/change-password

export default router;