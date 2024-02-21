import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createInstitute, deleteInstitute, getInstitute, updateInstitute } from '../controllers/institute.controler.js';

const router = express.Router();

router.post('/createInstitute', verifyToken, createInstitute)
router.get('/getInstitute', getInstitute)
router.delete('/deleteinstitute/:postId/:userId', verifyToken, deleteInstitute)
router.put('/updateinstitute/:postId/:userId', verifyToken, updateInstitute)


export default router;