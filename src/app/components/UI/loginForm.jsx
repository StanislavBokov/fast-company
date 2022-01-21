import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";
import CheckkBoxField from "../common/form/checkBoxField";
import * as yup from 'yup';


const LoginForm = () => {
    const [data, setdata] = useState({email:'',password:''})
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setdata({...data,[target.name]:target.value})
    }
const validateSchema = yup.object().shape({
    password:yup.string().required('Пароль обязательна для заполнения')
        .matches(/(?=.*[A-Z])/,'Пароль должен содержать хоть одну заглавную букву')
        .matches(/(?=.*[0-9])/,'Пароль должен содержать хоть одно число')
        .matches(/(?=.*[!@##$%^&*])/,'Пароль должен содержать один из специальных символов !@##$%^&*')
        .matches(/(?=.{8,})/,'Пароль должен состоять минимум из 8-ми символов'),
        email:yup.string().required('Электронная почта обязателен для заполнения').email('Емэйл ввелен некорректно'),

})

    // const validatorConfig = {
    //     email: {
    //         isRequired:{message:'Электронная почта обязательна для заполнения'},
    //         isEmail: {message:'Емэйл ввелен некорректно'}
    //     },
    //     password: {
    //         isRequired:{message:'Пароль обязательна для заполнения'},
    //         isPassword:{message:'Пароль должен содержать хоть одну заглавную букву'},
    //         isContainDigit: {message:'Пароль должен содержать хоть одно число'},
    //         min: {
    //             message:'Пароль должен состоять минимум из 8-ми символов',
    //             value:8
    //         }
    //     }  
    // }

    useEffect(() => {
        validate()
    },[data])
    const validate = () => {
        // const errors = validator(data,validatorConfig)
        validateSchema.validate(data).then(()=>setErrors({})).catch((err)=>setErrors({[err.path]:err.message}))
        // setErrors(errors) 
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

 
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if(!isValid) return
        console.log(data)
       
    }
    return (
    
        <form onSubmit={handleSubmit}>
            <TextField 
                label='Электроная почта' 
                type='text' name='email' 
                value={data.email} 
                onChange={handleChange}
                error={errors.email}
            />
            <TextField 
                label='Пароль' 
                type='password' name='password' 
                value={data.password} 
                onChange={handleChange}
                error={errors.password}
            />
            <CheckkBoxField
                value={data.stayOn}
                onChange={handleChange}
                name='stayOn'
            >
                Оставаться в системе 
            </CheckkBoxField> 
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Sumbit</button>
        </form>
  
    )
}
 
export default LoginForm;