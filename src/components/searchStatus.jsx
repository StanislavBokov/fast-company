import React from "react";

const SearchStatus = ({length}) => {

    const spantext = length > 4 || length === 1 ?
  `${length} человек тусанeт с тобой сегодня`:
    `${length} человек тусанут с тобой сегодня`
   
   const getColar = length === 0 ? 
        'bg-danger badge fs-5' :
       'bg-primary badge fs-5'
   
   return  <span className = {getColar}>{spantext}</span>
}  

export default SearchStatus