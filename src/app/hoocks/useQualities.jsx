import React, {useState,useEffect,useContext} from "react";
import qualitiesService from "../services/qualities.service";
import PropTypes from "prop-types"
import {toast} from "react-toastify"

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({children}) => {
    // const [isLoading,setLoading] = useState(true)
    const [qualities, setQualities] = useState([])
    // const [error, setError] = useState(null)
    // useEffect(() => {
    //     if(error!==null) {
    //        toast(error)
    //        setError(null)
    //     }
    // },[error])
    useEffect(() => {
        getQualitiesList()
    },[])
    // function errorCatcher(error) {
    //     const {message} = error.response.data
    //     setError(message)
    // }
    function getQualities(id) {
        
        const ari = id.map((i) => {
            return qualities.find((q) => q._id === i)
        })
        return ari

    }
    async function getQualitiesList() {
        try {
            const {content} = await qualitiesService.get()
            setQualities(content)
            
            // setLoading(false)
        } catch(error) {
            // errorCatcher(error)
        }
    }

    return <QualitiesContext.Provider value={{qualities,getQualities}}>{children}</QualitiesContext.Provider>
}