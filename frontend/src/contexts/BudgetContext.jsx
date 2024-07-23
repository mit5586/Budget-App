import React, {useState} from 'react'


export const BudgetContext = React.createContext()

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])
    

    function getBudgetExpenses(id) {
        return expenses.filter((expense)=>{
            return expense.budgetId === id
        })
    }

    async function addExpense({description, amount, id}) {
        const url = `http://localhost:5000/api/expenses/addexpense/${id}`
        
        let data = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-Token' : localStorage.getItem('token')
            },
            body: JSON.stringify({name: description, amount})
        })
        let response = await data.json()
        setExpenses(prev =>{
            return [...prev , response.expense]
        })
    }

    async function addBudget({name, max}) {
        const url = "http://localhost:5000/api/budgets/addbudget"
        
        let data = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-Token' : localStorage.getItem('token')
            },
            body: JSON.stringify({name, maxAmount: max})
        })
        let response = await data.json()
        setBudgets(prevBudget =>{
            return [...prevBudget , response]
        })
    }

    async function deleteExpense(id) {
        const url = `http://127.0.0.1:5000/api/expenses/deleteexpense/${id}`
        const data = await fetch(url, {
            method: "delete",
            headers: {
                'auth-Token' : localStorage.getItem('token')
            }
        })
        let response = await data.json()
        setExpenses(prev => prev.filter((exp => exp._id !== response.expense._id)))
    }

    async function deleteBudget(id) {
        let expenses = getBudgetExpenses(id)
        if(expenses.length > 0) return 
        const url = `http://127.0.0.1:5000/api/budgets/deletebudget/${id}`
        const data = await fetch(url, {
            method: "delete",
            headers: {
                'auth-Token' : localStorage.getItem('token')
            }
        })
        let response = await data.json()
        setBudgets(prev => prev.filter((bud => bud._id !== response.budget._id)))
    }

    async function getBudgets(){
        const url = 'http://127.0.0.1:5000/api/budgets/fetchallbudgets'
        const data = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-Token' : localStorage.getItem('token')
            }
        })
        let response = await data.json()
        setBudgets(response)
    }

    async function getExpenses(){
        const url = 'http://127.0.0.1:5000/api/expenses/fetchallexpenses'
        const data = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-Token' : localStorage.getItem('token')
            }
        })
        let response = await data.json()
        setExpenses(response.expenses)
    }

    async function userLogin(email, password){
        const url = `http://localhost:5000/api/auth/login`
        
        let data = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        let response = await data.json()
        if(!response.success) return response.success
        // save token and redirect 
        localStorage.setItem('token', response.authToken)
        return response.success
    }

    async function userSignup(name, email, password){
        const url = `http://localhost:5000/api/auth/createuser`
        
        let data = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        let response = await data.json()
        if(!response.success) return response.success
        // save token and redirect 
        localStorage.setItem('token', response.authToken)
        return response.success
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteExpense,
            deleteBudget,
            getBudgets,
            getExpenses,
            userLogin,
            userSignup
        }}>
            {children}
        </BudgetContext.Provider>
    )
}