import express from 'express';
import transactionController from '../controllers/transactionController.js'; // Added `.js` extension

const router = express.Router();

// Add Transaction - POST method
router.post('/add-transaction', transactionController.addTransaction);

// Get Transactions - GET method
router.post('/get-transaction', transactionController.getAllTransaction); // Fixed typo in 'transaction'

router.post('/edit-transaction', transactionController.editTransaction);
router.post('/delete-transaction', transactionController.deleteTransaction);

export default router;
