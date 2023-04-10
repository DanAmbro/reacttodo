import React from 'react'
//anytime we want to log a user in or out or check on who the user is, we need to 
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    //Step 2) write a hook to access any of the objects we wish to use from 
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleAuth() {
        await login()

        //return the user to a specific location
        return navigate('/')
    }

  return (
    //Step 3) Create the UI and call upon our useAuth() objects as needed.
    <div className='login'>
        <article className="bg-info mb-5 p-5 text-dark">
            <h1 className='text-center'>Welcome to My To Do List</h1>
        </article>
        <Container>
          <Card className='m-2 border-dark text-center'>
            <Card.Header className='bg-dark text-white'>
                <h2>Login for full functionality</h2>
            </Card.Header>
            <Card.Body>
                <button className='btn btn-success' onClick={() => handleAuth()}>
                    Login w/GitHub
                </button>
            </Card.Body>
          </Card>
        </Container>
    </div>
  )
}
