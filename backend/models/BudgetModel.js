const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    name : {
        type: String,
        required: true,
        minLength: 3
    },
    maxAmount: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('budgets', budgetSchema);