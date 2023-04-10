import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { currentUser } = useAuth()
  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>React To Do</Navbar.Brand>
        {/* Below is the hamburger button */}
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            {/* Links for each page will go inside this Navbar.Collapse component. In this project we are using
            react-router-dom, which carries a link component that will render tht anchor tag associated with the
            router we created in App.js. To access react-router-dom, we must first:  
                1) npm install react-router-dom
                2) import Link from react-router-dom */}
            <Nav>
              {currentUser &&
              <> 
                <Link to='/todos' className='nav-link'>Todos</Link>
                <Link to='/categories' className='nav-link'>Categories</Link>
              </> 
              }          
                <Link to='/bootstrap' className='nav-link'>Bootstrap</Link>
                <Link to='/routing' className='nav-link'>Routing</Link>
              {!currentUser &&  
                <Link to='/login' className='nav-link'>Login</Link>
              }  
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
