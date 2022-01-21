import UsersListPage from "../components/page/usersListPage/usersListPage";
import { useParams } from "react-router";
import API from "../API";
import UserPage from '../components/page/userPage/userPage'
import { useEffect, useState } from "react/cjs/react.development";
const Users = () => {
    const [posts,setPosts] = useState()
    const params = useParams()
    const {postId} = params
   
    useEffect(() => {
        API.users.fetchAll().then((data) => setPosts(data))
    },[])
     

    return <>
              {postId 
              ? (<UserPage id={postId} posts={posts}/>)
              : (<UsersListPage/>)
              }
           </>
}
 
export default Users;