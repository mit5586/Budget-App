const express = require('express')
const router = express.Router()
const Expense = require('../models/ExpenseModel')
const fetchUser = require('../middlewares/fetchUser')


router.get('/fetchexpenses/:budgetId', fetchUser, async(req, res)=>{
    const budgetId = req.params.budgetId
    try {
        const expenses = await Expense.find({budgetId, user: req.user})
        res.json({expenses})
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
})

router.get('/fetchallexpenses', fetchUser, async(req, res)=>{
    try {
        const expenses = await Expense.find({user: req.user})
        res.json({expenses})
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
})

router.post('/addexpense/:budgetId',fetchUser, async(req, res)=>{
    const {name, amount} = req.body;
    const user = req.user
    const budgetId = req.params.budgetId
    let success = false;
    try {
        const expense = await Expense.create({user, budgetId, name, amount})
        success = true;
        res.json({expense, success})
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
});

router.put('/updateexpense/:id', fetchUser, async (req, res) => {
    try {
        const { name, amount } = req.body
        //create a new expense obj
        const newExp = {}
        if (name) { newExp.name = name };
        if (amount) { newExp.amount = amount };

        //find the expense to update and update it
        let expense = await Expense.findById(req.params.id)
        if (!expense) { return res.status(404).send("not found") }

        if (expense.user.toString() !== req.user) {
            return res.status(401).send("not allowed")
        }

        expense = await Expense.findByIdAndUpdate(req.params.id, { $set: newExp }, { new: true })
        res.json(expense)
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
})

router.delete('/deleteexpense/:id', fetchUser, async (req, res) => {
    try {
        //find the expense to update and update it
        let expense = await Expense.findById(req.params.id)
        if (!expense) { return res.status(404).send("not found") }

        if (expense.user.toString() !== req.user) {
            return res.status(401).send("not allowed")
        }
        expense = await Expense.findByIdAndDelete(req.params.id)
        res.json({success: 'expense has been deleated', expense: expense})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error occured", message: error.message })
    }
})

module.exports = router

