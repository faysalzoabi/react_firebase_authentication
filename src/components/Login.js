import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link, useHistory}  from 'react-router-dom'

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error,  setError] =  useState('');
    const [loading,  setLoading] =  useState(false);
    const  history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to login in");
        }
        setLoading(false)
    }

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-2">Log In</h2>
                    {error && <Alert  variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef}  required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}  required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Login In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forget-password">Forgot Password?</Link>
                    </div>
               </Card.Body>
           </Card> 
           <div className="w-100 text-center mt-2">
               Need an Account? <Link to="/signup">Sign up</Link>
           </div>
        </>

    )
}

export default Login
