import React from "react";
import PropTypes from 'prop-types'
import { useEffect } from "react/cjs/react.development";

const SelectField = ({label,value,onChange,defaultOption,options,error,name}) => {

    const handleChange = ({target}) => {
        // console.log(target)
        onChange({name:target.name,value:target.value})
        
    }
    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid': '')
    }
    
    const optionsArray = 
        !Array.isArray(options) && typeof options === 'object'
        ? Object.keys(options).map(optionName => ({name:options[optionName].name,_id:options[optionName]._id}))
        : options
  
    return (
        <div className="mb-4">
                <label htmlFor={name} className="form-label">{label}</label>
                <select 
                    className={getInputClasses()}
                    id={name}
                    value={value}
                    name={name}
                    onChange={handleChange}
                >
                    <option disabled value="">{defaultOption}</option>
                    {optionsArray && optionsArray.map((option) => (
                       <>
                        <option 
                            
                            value={option._id}
                            key={option._id}>
                                {option.name}
                        </option></>))}
                </select>
                {error && <div className="invalid-feedback">
                    {error}
                </div>}
            </div>
    )
}
SelectField.propTypes = {
    defaultOption:PropTypes.string,
    name:PropTypes.string,
    label:PropTypes.string,
    value:PropTypes.string,
    onChange:PropTypes.func,
    error:PropTypes.string,
    option:PropTypes.oneOfType([PropTypes.object,PropTypes.array])
}
export default SelectField;