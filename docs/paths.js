/**
 * @swagger
 * path:
 *  /account/:
 *    get:
 *      summary: Get all account
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of all the users (Both active and inactive)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * path:
 *  /account/active:
 *    get:
 *      summary: Get all active accounts
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of only the active users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * path:
 *  /account/register:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * path:
 *  /account/login:
 *    post:
 *      summary: Get a JWT for an active user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginResponse'
 */

/**
 * @swagger
 * path:
 *  /account/verify:
 *    post:
 *      summary: Verify a user registration using the token extracted from the email
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserVerification'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserVerificationRes'
 */

/**
 * @swagger
 * path:
 *  /account/resend-token:
 *    post:
 *      summary: Resend the verification email to a user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserVerificationResend'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserVerificationRes'
 */

/**
 * @swagger
 * path:
 *  /account/send-password-reset:
 *    post:
 *      summary: Send a password reset token to the user.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserVerificationResend'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserVerificationRes'
 */

/**
 * @swagger
 * path:
 *  /account/password-reset:
 *    post:
 *      summary: Reset a user password with the token sent to the user.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PasswordReset'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserVerificationRes'
 */

/**
 * @swagger
 * path:
 *  /account/change-password:
 *    post:
 *      summary: Change a user password.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PasswordChange'
 *      responses:
 *        "200":
 *          description: The user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserVerificationRes'
 */