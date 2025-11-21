import express from 'express';
import { redirect } from '../controllers/linkController.js';

const router = express.Router();

router.get('/:code', redirect);

export default router;
