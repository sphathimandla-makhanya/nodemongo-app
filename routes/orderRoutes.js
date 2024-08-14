// routes/orderRoutes.js
import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/placeorder', protect, placeOrder);

export default router;
