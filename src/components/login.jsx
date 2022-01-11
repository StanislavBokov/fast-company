
import { useEffect, useState } from "react/cjs/react.development";
import TextField from "./textField";
import { validator } from "../utils/validate";


const Login = () => {
    const [value, setValue] = useState({email:'',password:''})
    const [errors, setErrors] = useState({})

    const handleChange = ({target}) => {
        setValue({...value,[target.name]:target.value})
    }
    const validatorConfig = {
        email: {
            isRequired:{message:'Электронная почта обязательна для заполнения'},
            isEmail: {message:'Емэйл ввелен некорректно'}
        },
        password: {
            isRequired:{message:'Пароль обязательна для заполнения'},
            isPassword:{message:'Пароль должен содержать хоть одну заглавную букву'},
            isContainDigit: {message:'Пароль должен содержать хоть одно число'},
            min: {
                message:'Пароль должен состоять минимум из 8-ми символов',
                value:8
            }
        }  
    }

    useEffect(() => {
        validate()
    },[value])
    const validate = () => {
        const errors = validator(value,validatorConfig)
        setErrors(errors) 
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

 
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if(!isValid) return
        console.log(value)
       
    }
    return (
    <div className="container mt-5">
        <div className="row">
            <div className='col-md-6 offset-md-3 shadow p-4'>
                <h1 mb-4>Login</h1>
        <form onSubmit={handleSubmit}>
            <TextField 
                label='Электроная почта' 
                type='text' name='email' 
                value={value.email} 
                onChange={handleChange}
                error={errors.email}
            />
            <TextField 
                label='Пароль' 
                type='password' name='password' 
                value={value.password} 
                onChange={handleChange}
                error={errors.password}
            />
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Sumbit</button>
        </form>
            </div>
        </div>
    </div>
    )
}
 
export default Login;