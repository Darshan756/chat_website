import React from 'react'
import AuthForm from '../components/AuthForm'
const SignIn = () => {
  return (
     <AuthForm 
     type = "signin"
     title = "Sign in"
     fields={[
      {name:"username",type:"text",placeholder:"Username"},
      {name:"password",type:"password",placeholder:"Password"},
     ]}
     submitText="Sign In"
     linkText="Don't have an account?"
     linkTo="/user/signup"
    />
  )
}

export default SignIn