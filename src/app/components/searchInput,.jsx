import React, { useState } from "react";

const SearchInput = ({search,value,setProf}) => {
   
  
    return (
        <input className='' type="text" name="" id="" value={value} onChange={(e) => search(e)} placeholder='Строка поиска...' onFocus={()=> {setProf()}}/>
    )
}
 
export default SearchInput;