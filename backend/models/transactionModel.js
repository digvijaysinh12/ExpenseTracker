import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    amount: {
        type: Number, // 'Number' should be capitalized
        required: [true, 'amount is required'],
    },
    type:{
        type:String,
        required:[true,'type is required']
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'description is required'], // Fixed spelling of 'required'
    },
    date: {
        type: Date,
        required: [true, 'date is required'],
    }
}, {
    timestamps: true,
});

// Model name should start with uppercase, and the export should match
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
