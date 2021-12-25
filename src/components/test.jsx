import Users from "./users";
import { useParams } from "react-router";
import Post from "./post";
import API from "../API";
const Test = () => {
    const params = useParams()
    const {postId} = params
    const posts = API.users.fetchAll()
     

    return <>
              {postId 
              ? (<Post id={postId} posts={posts}/>)
              : (<Users/>)
              }
           </>
}
 
export default Test;