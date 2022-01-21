export function validator (data, config) {
    const errors = {}

    function validate(validateMethod,data,config) {
        let statusValidate;
        switch (validateMethod) { 
            case 'isRequired':
                if(typeof data==='boolean') {
                    statusValidate =!data
                } else {
                    // statusValidate = data.trim()===''
                }
                
                break;
            case 'isEmail': {
                const emailRegEx = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegEx.test(data) 
                break
            }
            case 'isPassword': {
                const passwordRegEx = /[A-Z]+/g
                statusValidate = !passwordRegEx.test(data) 
                break
            }
            case 'isContainDigit': {
                const digitRegEx = /\d+/g
                statusValidate = !digitRegEx.test(data)
                break
            }
            case 'min': {
               statusValidate = data.length < config.value
               break
            }
        }
        if(statusValidate) return config.message
    }
    for(const fieldName in data) {
        config[fieldName]
        for(const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            )
            if(error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }    
    }
    return errors
}