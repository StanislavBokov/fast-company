import React from "react";

const Bookmark = ({status,fnToggle}) => {
     
    const getMark = (mark) => {
        return mark === false ? 
        'bi bi-bookmark m-1':
        'bi bi-bookmark-fill m-1'
    }
    return (
        <div className='border border-black w-25 p-2 bg-light'>
        <i 
          className={getMark(status.bookmark)} 
          onClick={()=>fnToggle.onToggle(status._id)}
          ></i>
        </div>
    )
}
export default Bookmark
