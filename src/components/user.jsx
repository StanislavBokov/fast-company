import React from "react";
import Qualitite from "./qualitie.jsx";
import Bookmark from "./bookmark";

const User = ({props,functions}) => {
  return (
    props.map((user,index) => {
        return (
           <tr key={index}>
           <td>{user.name}</td>
           <td>{<Qualitite qualitite={user}/>}</td> 
           <td>{user.profession.name}</td>
           <td>{user.completedMeetings}</td>
           <td>{user.rate}</td>
           <td><Bookmark 
                    status={user}
                    fnToggle={functions}
                    />
            </td> 
           <td><button 
           className = 'btn btn-danger'
           onClick={()=>functions.onDelete(user._id)}
           >Delete
           </button>
           </td>
         </tr>
         )
       })
  )
}


export default User