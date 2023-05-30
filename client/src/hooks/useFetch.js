import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
//query
const useFetch = (query)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    
    const baseUrl = `http://localhost:4000/api`
    const url = `${baseUrl}${query}`

    
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            try {
               const res = await axios.get(url) 
               setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData();
    },[url])

    const reFetch = async()=>{
        setLoading(true)
        try {
           const res = await axios.get(url) 
           setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {data,loading,error,reFetch}
}

export default useFetch;