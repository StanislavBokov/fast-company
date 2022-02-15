import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import {useQualities} from "../../../hoocks/useQualities"

const QualitiesList = ({ qualities }) => {
    const {getQualities} = useQualities()
    const quali = getQualities(qualities)
    return (
        <>
            {quali.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
