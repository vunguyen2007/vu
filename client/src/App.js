import './App.css'
import { BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import Langding from './components/layout/langding'
import Auth from './views/auth'
import AuthcontextProvider from './contexts/AuthContexts'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import NavbarMenu from './components/layout/NavbarMenu'
import { useState } from 'react'
import PostContextProvider from './contexts/PostContext'


function App() {
  
  return (
    <AuthcontextProvider>
      <PostContextProvider>
      <Router>
        <Routes>
          <Route  path='/' element={<Langding />}/>
          <Route  
            path='/login'
            element={ < Auth  authRoute='login' /> }
          />
          <Route  
            path='/register'
            element={ < Auth  authRoute='register' /> }
          />
        
        <Route  path="/dashboard" element={<Dashboard />}/> 
        
        
        
        
        </Routes>
      </Router>
      </PostContextProvider>
    </AuthcontextProvider>
   
  )
}
  
export default App
