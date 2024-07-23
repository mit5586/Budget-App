import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container'
import React, {useContext, useRef} from 'react'
import { BudgetContext } from '../contexts/BudgetContext'
import { useNavigate } from 'react-router-dom';

function Login() {
    const emailRef = useRef()
    const passRef = useRef()
    const useBudgets = useContext(BudgetContext)
    const {userLogin} = useBudgets
    const navigate = useNavigate()
    
    function handleSubmit(e){
        e.preventDefault()
        let email = emailRef.current.value
        let password = passRef.current.value
        let success = userLogin(email, password)
        success.then((check)=>{
            if(check){
                navigate('/')
            }
        })
    }
    return (
        <Container className='mt-3'>
            <h1>Welcome to iBudget - Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required={true} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Password" minLength={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Login;