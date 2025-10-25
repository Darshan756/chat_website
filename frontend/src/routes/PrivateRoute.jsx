import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({children}) => {
    const {accessToken} = useAuth()
    if(accessToken){
        return children
    }
    return <Navigate to='/user/signin' replace />
}

export default PrivateRoute