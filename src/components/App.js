import React, { useState } from "react";
import Users from "./users";
import SearchStatus from "./searchStatus";
import API from "../API";

function App() {
    const [users, setUsers] = useState(API.users.fetchAll())
    
    const handleDelete = (userId) => {
        const newList = users.filter((item)=>item._id!==userId)
      
        setUsers(newList)
    }
    const handleToggleBookmark = (id) => {
        const markId = users.findIndex((c) => c._id === id);
        !users[markId].bookmark?
         users[markId].bookmark = true:
         users[markId].bookmark = false

        setUsers([...users])
    }
    return (
        users.length === 0 ? 
        <span className = 'badge bg-danger fs-5 m-1'>Никто с тобой не тусанет</span>:
         <>
         <SearchStatus length={users.length}/>
         <Users users={users} 
                onDelete={handleDelete}
                onToggle={handleToggleBookmark}
                /> 
         </>
    )
}
export default App