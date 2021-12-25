import React from "react";
import QualitiesList from "./qualitiesList"
import { useHistory } from "react-router";




const Post = ({id,posts}) => {
    const history = useHistory()
    const getPostById = (id) => {
       return posts.find((post)=>post._id===id)
    }
    const post = getPostById(id)
    const handleReset = () => {
        history.push("/users")
    }
    return post 
        ? <div>
              <h1>{post.name}</h1>
              <h2>{`Профессия: ${post.profession.name}`}</h2>
              <span>{<QualitiesList qualities={post.qualities}/>}</span> 
              <div><span>{`CompletedMeetings: ${post.completedMeetings}`}</span></div>
              <h3>{`Rate: ${post.rate}`}</h3>
              <button onClick={()=>{handleReset()}}>Все пользователи</button>
           </div>
        : <h1>Loading</h1>   
}
 
export default Post;