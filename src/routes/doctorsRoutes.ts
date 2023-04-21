import express from 'express';
const router = express.Router();
import { Signup, Login, Logout } from '../controllers/doctorsControllers';


router.post('/signup', Signup);
router.post('/login', Login);
router.get('/logout', Logout);

export default router