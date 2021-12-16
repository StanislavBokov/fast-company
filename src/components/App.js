import React, { useState } from "react";
import Users from "./users";

import API from "../API";

function App() {
    const [users, setUsers] = useState(API.users.fetchAll());
    const handleDelete = (userId) => {
        const newList = users.filter((item) => item._id !== userId);
        setUsers(newList);
    };
    const handleToggleBookmark = (id) => {
        const markId = users.findIndex((c) => c._id === id);
        !users[markId].bookmark
            ? (users[markId].bookmark = true)
            : (users[markId].bookmark = false);

        setUsers([...users]);
    };
    return (
        <div>
            
            <Users
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
                users={users}
            />
        </div>
    );
}
export default App;
