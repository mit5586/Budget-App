import React, {useContext} from 'react'
import BudgetCard from './BudgetCard'
import { BudgetContext } from '../contexts/BudgetContext'

function TotalBudgetCard() {
    const useBudgets = useContext(BudgetContext)
    const {expenses, budgets} = useBudgets
    const amount = expenses.reduce((total, expense)=>{
        return total + expense.amount
    }, 0)

    const max = budgets.reduce((total, budget)=>{
        return total + budget.maxAmount
    }, 0)
    if(max === 0) return null
  return (
    <BudgetCard amount={amount} name="Total" gray max={max} buttons></BudgetCard>
  )
}

export default TotalBudgetCard