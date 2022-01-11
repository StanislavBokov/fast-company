import React, { useState } from "react";

const SearchInput = ({search,value}) => {
   
  
    return (
        <input className='' type="text" name="" id="" value={value} onChange={(e) => search(e)} placeholder='Строка поиска...'/>
    )
}
 
export default SearchInput;