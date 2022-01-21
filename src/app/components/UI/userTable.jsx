import React  from 'react';
import PropTypes from "prop-types"
import BookMark from '../common/bookmark';
import Qualitie from './qualities';
import Table from '../common/table';

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete,
    ...rest}) => {
   const columns = {
      name:{path:"name",name:"Имя"},
      qualities:{
          name:"Качества",
          component:(user)=>(<Qualitie qualities={user.qualities}/>)},
      profession:{path:"profession.name",name:"Профессия"},
      completedMeetings:{
          path:"completedMeetings",
          name:"Встретился,раз"
      },
      rate:{path:"rate",name:"Оценка"},
      bookmark:{
          path:"bookmark",
          name:"Избранное",
          component: (user) => (
            <BookMark
                status={user.bookmark}
                onClick={() => onToggleBookmark(user._id)}
           />
          )
        },
      delete:{component:(user)=> (<button
        className="btn btn-danger"
        onClick={() => onDelete(user._id)}
    >
        Delete
    </button>)} 
   }
    return ( 
    <Table
        onSort={onSort} 
        selectedSort={selectedSort}
        columns={columns}
        data={users}
    />
    )
}

export default UserTable

UserTable.propTypes={
    users:PropTypes.array.isRequired,
    onSort:PropTypes.func.isRequired,
    selectedSort:PropTypes.object.isRequired,
    onToggleBookmark:PropTypes.func.isRequired,
    onDelete:PropTypes.func.isRequired
}