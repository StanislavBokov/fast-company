import React from "react";
import PropTypes from "prop-types"
import { isArray } from "lodash";
// import { isArray } from "lodash";

const GroupList = ({items,valueProperty,contentPropperty,onItemSelect,selectedItem}) => {
    return (   
        isArray(items)?
        <ul className="list-group">
            {items.map((item) => {
               
               return <li key={item[valueProperty]}
                          className={"list-group-item" + (item === selectedItem?" active":"")} 
                          onClick={()=>onItemSelect(item)}
                          

                      >
                          {item[contentPropperty]}
                          
                      </li>
            })}
        </ul> :   
        <ul className="list-group">
            {Object.keys(items).map((item)=> {
        return  <li key={items[item][valueProperty]} 
                className={"list-group-item" + (items[item] === selectedItem?" active":"")} 
                onClick={()=>onItemSelect(items[item])}
                role="button"
                >
                    {items[item][contentPropperty]}
                </li>
            })}
          
        </ul> 
        
    );
};
GroupList.defaultProps={
    valueProperty:"_id",
    contentPropperty:"name"
}
GroupList.propTypes={
    items:PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
    valueProperty:PropTypes.string.isRequired,
    contentPropperty:PropTypes.string.isRequired,
    onItemSelect:PropTypes.func,
    selectedItem:PropTypes.object
}

export default GroupList;
