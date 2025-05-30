import express from 'express';
import { google, resetpass, setnewpass, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/resetpass', resetpass);
router.post('/setnewpass', setnewpass);
router.post('/google', google)

export default router;