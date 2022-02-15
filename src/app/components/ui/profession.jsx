import React from "react";
import { useProfessions } from "../../hoocks/useProfession";
import PropTypes from "prop-types"

const Profession = ({id}) => {
    const {isLoading,getProfession} = useProfessions()
    // console.log(id)
    const prof = getProfession(id)
    if(!isLoading) {
        return <p>{prof.name}</p>
    } else {
        return 'Loading...'
    }
}
Profession.propTypes={
    id:PropTypes.string
}
 
export default Profession;