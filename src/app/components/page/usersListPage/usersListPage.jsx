import React, { useState,useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import API from "../../../API";
import GroupList from "../../common/groupList";
import SearchStatus from "../../UI/searchStatus";
import UserTable from "../../UI/userTable";
import SearchInput from "../../searchInput,";
import _ from "lodash"

const usersListPage = () => {
    
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [proffesions, setProffesion] = useState()
    const [selectedProf,setSelectedProf] = useState()
    const [sortBy,setSortBy] = useState({path:"name",order:"asc"})
    const [users, setUsers] = useState();
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data))
    },[])
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProffesion(data))
    },[])
    useEffect(() => {
        setCurrentPage(1)
    },[selectedProf])
 
    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
    }
    const getSearchedUsers = () => {
        let searchedUsers = users && users.filter(user => user.name?.toLowerCase().includes(searchValue))
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



export default usersListPage;

usersListPage.propTypes = {
    users: PropTypes.array
};
