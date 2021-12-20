import React from "react";
import PropTypes from "prop-types"
import Qualitie from "./qualitie";

const QualitiesList = ({qualities}) => {
    return <>
     {qualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
    </>
}
QualitiesList.propTypes={
    QualitiesList:PropTypes.array
}
 
export default QualitiesList;
