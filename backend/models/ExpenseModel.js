const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'budgets',
        required: true,
    },
    name : {
        type: String,
        required: true,
        minLength: 3
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('expenses', expenseSchema)