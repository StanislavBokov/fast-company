import React from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import LoginForm from "../components/UI/loginForm";
import RegistorForm from "../components/UI/registorForm";

const Login = () => {
    const {type} = useParams()
    const [formType,setFormType] = useState(type==='registor'? type:'login')
   

    const toggleFormType = (params) => {
        setFormType(prevState => prevState==='registor'?'login':'registor')
    }


    return (
    <div className="container mt-5">
        <div className="row">
            <div className='col-md-6 offset-md-3 shadow p-4'>
                    {formType==='registor'
                    ? <>
                        <h1 className='mb-4'>Registor</h1>
                        <RegistorForm/>
                        <p>
                            Already have account?
                            <a role='button' onClick={toggleFormType}>Sign In</a>
                        </p>
                      </>
                    : <>
                        <h1 className='mb-4'>Login</h1>
                        <LoginForm/>
                        <p>
                            Don't have account?
                            <a role='button' onClick={toggleFormType}>Sign Up</a>
                        </p>
                      </>}
             </div>
        </div>
    </div>)
}
 
export default Login;