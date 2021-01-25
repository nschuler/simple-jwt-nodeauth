import { check } from 'express-validator';

export const registerValidations = [
  check(['firstName', 'lastName'], 'Name is not valid')
    .exists()
    .matches(/^[a-z ,.'-]+$/i),
  check('email', 'Email Address is not valid')
    .exists()
    .isEmail(),
  check('password', 'Password must be over 8 characters').exists().isLength({ min: 8 }),
];

// The following checks a login payload and ensures both email and password are valid
export const loginValidations = [
    check('email', 'Email is not valid')
      .exists()
      .isEmail(),
    check('password', 'Password must be over 8 characters')
      .exists()
      .isLength({ min: 8 }),
  ];