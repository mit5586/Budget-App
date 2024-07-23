import { Stack, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'
import BudgetCard from './BudgetCard'
import AddBudgetModal from './AddBudgetModal'
import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from '../contexts/BudgetContext'
import AddExpenseModal from './AddExpenseModal'
import ViewExpenseModal from './ViewExpenseModal'
import TotalBudgetCard from './TotalBudgetCard'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
    const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
    const useBudgets = useContext(BudgetContext)
    const { budgets, getBudgets, getExpenses, getBudgetExpenses, expenses } = useBudgets
    const navigate = useNavigate()

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getBudgets()
            getExpenses()
        }
        else {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Container className='mt-3'>
                <Stack direction='horizontal' gap='2' className='mb-4'>
                    <h1 className='me-auto'>Budgets</h1>
                    <Button variant='primary' onClick={() => { setShowAddBudgetModal(true) }} >Add Budget</Button>
                    <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
                </Stack>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1rem", alignItems: "flex-start" }}>

                    {budgets.map((budget) => {
                        const amt = getBudgetExpenses(budget._id).reduce((total, expense) => {
                            return total + expense.amount
                        }, 0)
                        return (
                            <BudgetCard
                                key={budget._id}
                                name={budget.name}
                                amount={amt}
                                max={budget.maxAmount}
                                onAddExpenseClick={() => { openAddExpenseModal(budget._id) }}
                                onViewExpenseClick={() => { setViewExpenseModalBudgetId(budget._id) }} />
                        )
                    })}
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => { setShowAddBudgetModal(false) }} />
            <AddExpenseModal
                show={showAddExpenseModal}
                handleClose={() => { setShowAddExpenseModal(false) }}
                defaultBudgetId={addExpenseModalBudgetId} />
            <ViewExpenseModal
                budgetId={viewExpenseModalBudgetId}
                handleClose={() => { setViewExpenseModalBudgetId() }}
            />
        </>
    )
}

export default Home