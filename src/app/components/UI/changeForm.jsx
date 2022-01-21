// import React from "react";
// import { useEffect, useState } from "react/cjs/react.development";
// import TextField from "../common/form/textField";
// import { validator } from "../../utils/validate";
// import API from "../../API";
// import SelectField from "../common/form/selectField";
// import RadioField from "../common/form/radioField";
// import MultiSelectField from "../common/form/multiSelectFiels";
// import CheckkBoxField from "../common/form/checkBoxField";
// import { useParams,useHistory } from "react-router";

// const ChangeForm = () => {
//     const [data, setData] = useState({
//         name:'',
//         email:'',
       
//         profession:''
       
    
//     })
//     const [proffesions, setProffesion] = useState()
//     const [errors, setErrors] = useState({})
//     const [qualities,setQualities] = useState({})
//     const [users,setUsers] = useState()
//     const [currentUser,setCurrentUser] = useState()

//     useEffect(() => {
//         API.users.fetchAll().then((data) => setUsers(data))
//     },[])
//     const paramId = useParams()
//     const {postId} = paramId
//     const history = useHistory()

//     useEffect(() => {
//           API.users.getById(postId).then(({ profession, qualities, ...data }) =>
//           setData((prevState) => ({
//               ...prevState,
//               ...data,
//               // qualities: transformData(qualities),
//            profession: profession._id
//           }))
//         );
//     API.users.getById(postId).then((data)=>setCurrentUser(data))
//         API.professions.fetchAll().then((data) => setProffesion(data))
//         API.qualities.fetchAll().then((data) => setQualities(data))
//     },[])
//     // console.log(currentUser.profession._id)
//     const getProfessionById = (id) => {
//         for (const prof in proffesions) {
//             const profData = proffesions[prof];
//             if (profData._id === id) return profData;
//         }
//     }
//     // console.log(getProfessionById(currentUser?.profession._id))
    

    
//       useEffect(() => {
//      setData({
//              ...data,
//              name:currentUser?.name,
//              email:currentUser?.email,
           
        
//              sex:currentUser?.sex,
//             //   qualities:currentUser?.qualities?.map((q) => (
//             //       {label:q.name,value:q._id}
//             //   ))
//           })
//       },[currentUser])
//       console.log(currentUser)
 

  
//     const handleChange = (target) => {
//  console.log(target)
//         setData({
//             ...data,[target.name]:target.value})
            
//     }
//     const validatorConfig = {
//         email: {
//             isRequired:{message:'Электронная почта обязательна для заполнения'},
//             isEmail: {message:'Емэйл ввелен некорректно'}
//         },
//         password: {
//             isRequired:{message:'Пароль обязательна для заполнения'},
//             isPassword:{message:'Пароль должен содержать хоть одну заглавную букву'},
//             isContainDigit: {message:'Пароль должен содержать хоть одно число'},
//             min: {
//                 message:'Пароль должен состоять минимум из 8-ми символов',
//                 value:8
//             }
//         },
//         profession: {
//             isRequired:{
//                 message:'Обязательно выберете вашу прффесию'
//             }
//         },
//         licence: {
//             isRequired: {
//                 message:'Вы не можете использовать наш сервис без подтверждения лицензионого споглошения'
//             }
//         }
//     }
   
//     useEffect(() => {
//         validate()
//     },[data])
//     const validate = () => {
//         const errors = validator(data,validatorConfig)
//         setErrors(errors) 
//         return Object.keys(errors).length === 0
//     }
//     const isValid = Object.keys(errors).length === 0

 
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         //  const isValid = validate()
//         //  if(!isValid) return
//          API.users.update(postId, {
//              ...currentUser,
//              profession:getProfessionById(profession)
//          })
//          history.push(`users/${postId}`)
        
       
       
//     }
//     //  Object.keys(currentUser).length!==0?
//     return (
//         <div className="container mt-5">
//         <div className="row">
//             <div className='col-md-6 offset-md-3 shadow p-4'>   
//         <form onSubmit={handleSubmit}>
//         <TextField 
//                 label='Имя' 
//                 name='name' 
//                 value={data.name} 
//                 onChange={handleChange}
//                  error={errors.email}
//             />
//             <TextField 
//                 label='Электроная почта' 
//                 name='email' 
//                 value={data.email} 
//                 onChange={handleChange}
//                 error={errors.email}
//             />
        
//             <SelectField
//                 defaultOption='Choose...'
//                 options={proffesions}
//                 onChange={handleChange}
//                 value={data.profession}
//                 error={errors.profession}
//                 label='Выберете вашу проффесию'
//                 name='profession'
//                 />
//             <RadioField
//                 options={[
//                     {name:'Male', value:'male'},
//                     {name:'Female', value:'female'},
//                     {name:'Other', value:'other'}
//                 ]}
//                 value={data.sex}
//                 name='sex'
//                 onChange={handleChange}
//                 label='Выберите ваш пол'
//             />
//             <MultiSelectField
//                 options={qualities}
//                 onChange={handleChange}
//                 defaultValue={data.qualities}
//                 name='qualities'
//                 label='Выберите ваши качества'
//             />
          
          
//             <button  className='btn btn-primary w-100 mx-auto'>Обновить</button>
//         </form>
//         </div>
//         </div>
//     </div>
  
//     )
//     //  :<h1>Loader</h1>
// }
 

import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validate";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectFiels";
import CheckkBoxField from "../common/form/checkBoxField";
import { useParams,useHistory } from "react-router";


const ChangeForm = () => {
    const { postId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: ""
    });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        API.users
          .update(postId, {
              ...data,
              profession: getProfessionById(profession),
              qualities: getQualities(qualities)
          })
          .then((data) => history.push(`/users/${data._id}`));
        console.log(data);
    };
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    useEffect(() => {
        setIsLoading(true);
        API.users.getById(postId).then(({ profession, qualities, ...data }) =>
          setData((prevState) => ({
              ...prevState,
              ...data,
              qualities: transformData(qualities),
              profession: profession._id
          }))
        );
        API.qualities.fetchAll().then((data) => setQualities(data));
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
      <div className="container mt-5">
          <div className="row">
              <div className="col-md-6 offset-md-3 shadow p-4">
                  {!isLoading && Object.keys(professions).length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <TextField
                          label="Имя"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                          error={errors.name}
                        />
                        <TextField
                          label="Электронная почта"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          error={errors.email}
                        />
                        <SelectField
                          label="Выбери свою профессию"
                          defaultOption="Choose..."
                          options={professions}
                          name="profession"
                          onChange={handleChange}
                          value={data.profession}
                          error={errors.profession}
                        />
                        <button
                          type="submit"
                          disabled={!isValid}
                          className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                  ) : (
                    "Loading..."
                  )}
              </div>
          </div>
      </div>
    );
};

export default ChangeForm;
