import React, {useRef, useContext} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { BudgetContext } from '../contexts/BudgetContext'

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const useBudgets = useContext(BudgetContext)
    const {addExpense, budgets} = useBudgets
    function handleSubmit(e){
        e.preventDefault()
        addExpense(
        {
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            id: budgetIdRef.current.value
        })
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" required ref={descriptionRef}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" required min={0} step={0.01} ref={amountRef} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select 
                            defaultValue={defaultBudgetId} 
                            required ref={budgetIdRef}
                        >
                            {budgets.map(budget => (
                                <option key={budget._id} value={budget._id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" type="submit" >Add</Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal   