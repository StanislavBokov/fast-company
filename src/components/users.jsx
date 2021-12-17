import React, { useState,useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import API from "../API";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users:allUsers, ...rest }) => {
    
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [proffesions, setProffesion] = useState()
    const [selectedProf,setSelectedProf] = useState()
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
       
        setSelectedProf(item)
    }
    
    const clearFilter = () => {
        setSelectedProf()
    }

    const filteredUsers = selectedProf 
        ? allUsers.filter((user) => JSON.stringify(user.profession)=== JSON.stringify(selectedProf))
        : allUsers
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

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
            {count > 0 && (
            <table className="table caption-top">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качество</th>
                        <th scope="col">Професия</th>
                        <th scope="col">Встретился,раз</th>
                        <th>Оценка</th>
                        <th>Избранное</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => (
                        <User key={user._id} {...rest} {...user} />
                    ))}
                </tbody>
            </table>)}
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
    );
};



export default Users;

Users.propTypes = {
    users: PropTypes.array
};
