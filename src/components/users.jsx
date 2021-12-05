import React, { useState } from "react";
import api from "../API"

const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll())

   const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter(obj=>obj._id!=userId))
   }

   const renderPhrase = (number) => {
     const spantext = number > 4 || number === 1 ?
       `${number} человек тусанeт с тобой сегодня`:
       `${number} человек тусанут с тобой сегодня`

       const getColar = number === 0 ? 
       'bg-danger badge fs-5' :
       'bg-primary badge fs-5'

       return <caption className = 'p-1'>
                 <span className = {getColar}>{spantext}</span>
              </caption>
   }
 
   const infoAboutUser = () => {
    const getColorQualitie = (color) => {
      return `bg-${color} badge m-1`
    } 

    return users.map((user,index) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.qualities.map((qualitie,index) => {
            return <span key={index} className = {getColorQualitie(qualitie.color)}> {qualitie.name}</span> 
          })}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td><button 
          className = 'btn btn-danger'
          onClick={()=>handleDelete(user._id)}
          >Delete
          </button>
          </td>
        </tr>
      )
      })
   }
   return (
     users.length === 0 ? 
     <span className = 'badge bg-danger fs-5 m-1'>Никто с тобой не тусанет</span>:
    <table className="table caption-top">
       {renderPhrase(users.length)}
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Професия</th>
              <th scope="col">Встретился,раз</th>
              <th>Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {infoAboutUser()}
          </tbody>
    </table>
   )
}
export default Users