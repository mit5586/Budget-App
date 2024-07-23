const express = require('express')
const router = express.Router()
const Budgets = require('../models/BudgetModel')
const fetchUser = require('../middlewares/fetchUser')

router
.get('/fetchallbudgets', fetchUser, async (req, res)=>{
    try {
        const budgets = await Budgets.find({user: req.user})
        res.json(budgets)
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`)
    }
})

router
.post('/addbudget', fetchUser, async(req, res)=>{
    try {
        const {name, maxAmount} = req.body
        const budget = new Budgets({name, maxAmount, user: req.user})
        const savedBudget = await budget.save()
        res.json(savedBudget)
    } catch (error) {
        console.log(error);
        res.status(500).send(`internal server error, ${error.message}`) 
    }
})

router
.delete('/deletebudget/:id', fetchUser, async(req, res)=>{
    try {
        let budget = await Budgets.findById(req.params.id)
        if (!budget) { return res.status(404).send("not found") }

        if (budget.user.toString() !== req.user) {
            return res.status(401).send("not allowed")
        }
        budget = await Budgets.findByIdAndDelete(req.params.id)
        res.json({success: 'budget has been deleated', budget: budget})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error occured", message: error.message })
    }
})


module.exports = router
