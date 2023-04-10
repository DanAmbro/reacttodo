//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Todos from './components/Todos/Todos'
import Categories from './components/Categories/Categories'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound/NotFound'
import Footer from './components/Footer';
import AuthProvider from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="App">
      {/* The Below component is actually calling the BrowserRouter because we made an alias in the import. We 
      surround our Routes and our Navigation because they both rely on our Router's Logic for their functionality */}
      <AuthProvider>
      <Router>
        <Navigation />
        {/* The Below Routes component is like a switch that decides what to render based on the url path */}
        <Routes>
          <Route path='/' element={<ProtectedRoute><ToDos/></ProtectedRoute>} />                    
          <Route path='/login' element={<Login />} />
          <Route path='/todos' element={<ProtectedRoute><ToDos/></ProtectedRoute>} />
          <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>} />

          {/* The NotFound component will be an error handler and will be tied to any other Route than what is 
          detailed above.  All Routes listed above this Route will have very specific paths that are listed for 
          them. This Route will be a catch-all */}
          <Route path='*' element={<NotFound />} />
        </Routes>
          <Footer /> 
      </Router>

      
      </AuthProvider>
    </div>
  );
}


