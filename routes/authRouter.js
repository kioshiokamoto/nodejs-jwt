import {Router} from 'express';
import {login_get, login_post, signup_get, signup_post, logout_get} from '../controllers/authController.js';

const router = Router();

router.get('/signup',signup_get);
router.post('/signup',signup_post);
router.get('/login',login_get);
router.post('/login',login_post);
router.get('/logout',logout_get);

export default router;
