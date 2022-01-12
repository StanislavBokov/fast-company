import React, { useState,useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import API from "../API";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import SearchInput from "./searchInput,";
import _ from "lodash"

const Users = () => {
    
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [proffesions, setProffesion] = useState()
    const [selectedProf,setSelectedProf] = useState()
    const [sortBy,setSortBy] = useState({path:"name",order:"asc"})

    const [users, setUsers] = useState(API.users.fetchAll());
    const [searchValue, setSearchValue] = useState('')
    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
    }

    const getSearchedUsers = () => {

        let searchedUsers = users.filter(user => user.name.toLowerCase().includes(searchValue))
        return searchedUsers
    }
    
    const searchedUsers = getSearchedUsers()
  

   
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

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProffesion(data))
    },[currentPage])
    useEffect(() => {
        setCurrentPage(1)
    },[selectedProf])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProffesionSelect = (item) => {
        setSearchValue('')
        setSelectedProf(item)
    } 
    const clearFilter = () => {
        setSelectedProf()
    }
    const handleSort = (item) => {
       setSortBy(item)
    }

    if(users) {
    const filteredUsers = selectedProf 
        ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : users
    

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(searchValue?searchedUsers:filteredUsers,[sortBy.path],[sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        
        <div className="d-flex">
        
       
        {proffesions && (
            
             <div className="d-flex flex-column flex-shrink-0 p-3">
             <GroupList items={proffesions}
                        onItemSelect={handleProffesionSelect}
                        selectedItem={selectedProf}
             />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Отчистить</button>
            </div>
        )}
            <div className="d-flex flex-column">
            <SearchStatus length={count}/>
            <SearchInput
                search={handleSearchValue}
                value={searchValue}
                setProf={setSelectedProf}
            />
            {count > 0 && (
            <UserTable users={userCrop}
                       onSort={handleSort} 
                       selectedSort={sortBy}
                       onDelete={handleDelete}
                       onToggleBookmark={handleToggleBookmark}
                       />
            )}
            <div className="d-flex justify-content-center">
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            </div>
            </div>
            
        </div>
    );}
    return "loading..."
};



export default Users;

Users.propTypes = {
    users: PropTypes.array
};
