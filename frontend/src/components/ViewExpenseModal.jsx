import React, {useContext} from 'react'
import { Modal, Stack, Button } from 'react-bootstrap'
import { BudgetContext } from '../contexts/BudgetContext'
import { currencyFormatter } from '../utils'


const ViewExpenseModal = ({ budgetId, handleClose }) => {
    const useBudgets = useContext(BudgetContext)
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets
    const budget = budgets.find(b => b._id === budgetId)
    const expenses = getBudgetExpenses(budgetId)
    return (
        <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap={2}>
                            <div>Expenses - {budget? `${budget.name}`: ""}</div>
                            <Button disabled={expenses.length > 0? true: false} onClick={()=>{
                                deleteBudget(budget._id)
                                handleClose()
                            }} variant="outline-danger">Delete</Button>
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap={3}>
                        {expenses.map(expense => (
                            <Stack direction='horizontal' gap={2} key={expense._id}>
                                <div className='me-auto fs--4'>{expense.name}</div>
                                <div className='fs--5'>{currencyFormatter.format(expense.amount)}</div>
                                <Button onClick={()=>{deleteExpense(expense._id)}} variant="outline-danger" size="sm" >&times;</Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
        </Modal>
    )
}

export default ViewExpenseModal   