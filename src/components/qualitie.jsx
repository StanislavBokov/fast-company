import React from "react";

const Qualitite = ({qualitite}) => {
    return (
       qualitite.qualities.map((item,index)=> {
            return <span key={index}
                         className={`bg-${item.color} badge m-1`}>
                        {item.name}
                   </span>
        })
    )
}
export default Qualitite

