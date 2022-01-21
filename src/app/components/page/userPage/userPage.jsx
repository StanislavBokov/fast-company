import React, { useState } from "react";
import QualitiesList from "../../UI/qualities/qualitiesList";
import { Route, useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import API from "../../../API";
const UserPage = ({id,posts}) => {
    console.log(posts)
    const history = useHistory()
  
   const [post,setPost] = useState()
   useEffect(() => {
      API.users.getById(id).then((data) => setPost(data))
   },[])
    const handleChangeUser = () => {
         history.push(`${id}/edit`)
    }
   //   console.log(post)
    
    return post 
        ? <div>
              <h1>{post.name}</h1>
              <h2>{`Профессия: ${post.profession?.name}`}</h2>
              <span>{<QualitiesList qualities={post.qualities}/>}</span> 
              <div><span>{`CompletedMeetings: ${post.completedMeetings}`}</span></div>
              <h3>{`Rate: ${post.rate}`}</h3>
              <button onClick={()=>{handleChangeUser()}}>Изменить</button>
           </div>
        : <h1>Loading</h1>   
}
 
export default UserPage;