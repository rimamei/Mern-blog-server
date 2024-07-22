import express from 'express';
import { login, register } from '../controllers/auth.js';
import {
  validateLogin,
  validateRegistration,
} from '../validation/authValidation.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router;
