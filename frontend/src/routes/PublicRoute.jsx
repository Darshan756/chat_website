import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
const PublicRoute = ({children}) => {
    const {accessToken} = useAuth()
   if(accessToken){
    return <Navigate to='/' replace />
   }
    return children
    
  
}

export default PublicRoute