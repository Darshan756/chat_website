import React from 'react'
import { Link } from "react-router-dom";
import AuthForm from '../components/AuthForm';

const SignUp = () => {
  return (
    <AuthForm 
     type = "register"
     title = "Create Account"
     fields={[
      {name:"username",type:"text",placeholder:"Username",required:true},
      {name:"first_name",type:"text",placeholder:"First Name",required:true},
      {name:"last_name",type:"text",placeholder:"Last Name",required:true},
      {name:"profile_picture",type:"file",placeholder:'Select Profile Picture',required:false },
      {name:"password",type:"password",placeholder:"Password",required:true},
      {name:"confirm_password",type:"password",placeholder:"Confirm Password",required:true},
     ]}
     submitText="Sign Up"
     linkText="Already have an account?"
     linkTo="/user/signin"
    />
  )
}

export default SignUp