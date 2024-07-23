import React,{useRef, useContext} from 'react'
import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container'
import { BudgetContext } from '../contexts/BudgetContext'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const useBudgets = useContext(BudgetContext)
    const {userSignup} = useBudgets
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        let name = nameRef.current.value
        let email = emailRef.current.value
        let password = passRef.current.value
        let success = userSignup(name, email, password)
        success.then((check)=>{
            if(check){
                navigate('/')
            }
        })
    }
  return (
    <Container className='mt-3'>
            <h1>Welcome to iBudget - Signup</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Enter Name" required={true} minLength={3}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Password" minLength={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
  )
}

export default Signup