const mongoose = require("mongoose");


const rentalHistorySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', required: true
     },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'product', 
        required: true
     },
    quantity: { 
        type: Number, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    totalDays: { 
        type: Number, 
        required: true
     },
    totalAmount: {
         type: Number,
         required: true
         },
    createdAt: { 
        type: Date,
         default: Date.now 
        }
});

const RentalHistory = mongoose.model('RentalHistory', rentalHistorySchema);

module.exports = RentalHistory;

