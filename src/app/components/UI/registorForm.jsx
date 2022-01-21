import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectFiels";
import CheckkBoxField from "../common/form/checkBoxField";

const RegistorForm = () => {
    const [data, setData] = useState({
        email:'',
        password:'',
        profession:'',
        sex:'male',
        qualities:[],
        licence:false
    })
    const [proffesions, setProffesion] = useState([])
    const [errors, setErrors] = useState({})
    const [qualities,setQualities] = useState({})

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProffesion(data))
        API.qualities.fetchAll().then((data) => setQualities(data))
    },[])
    const handleChange = (target) => {
        setData({...data,[target.name]:target.value})
        console.log(target)
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
        },
        profession: {
            isRequired:{
                message:'Обязательно выберете вашу прффесию'
            }
        },
        licence: {
            isRequired: {
                message:'Вы не можете использовать наш сервис без подтверждения лицензионого споглошения'
            }
        }
    }

    useEffect(() => {
        validate()
    },[data])
    const validate = () => {
        const errors = validator(data,validatorConfig)
        setErrors(errors) 
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

 
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if(!isValid) return
    
       
    }
    return (
    
        <form onSubmit={handleSubmit}>
            <TextField 
                label='Электроная почта' 
                name='email' 
                value={data.email} 
                onChange={handleChange}
                error={errors.email}
            />
            <TextField 
                label='Пароль' 
                type='password'
                name='password' 
                value={data.password} 
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                defaultOption='Choose...'
                options={proffesions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
                label='Выберете вашу проффесию'
                name='profession'
                />
            <RadioField
                options={[
                    {name:'Male', value:'male'},
                    {name:'Female', value:'female'},
                    {name:'Other', value:'other'}
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Выберите ваш пол'
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name='qualities'
                label='Выберите ваши качества'
            />
            <CheckkBoxField
                value={data.licence}
                onChange={handleChange}
                name='licence'
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckkBoxField>
          
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Sumbit</button>
        </form>
  
    )
}
 
export default RegistorForm;