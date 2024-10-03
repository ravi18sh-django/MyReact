import { useEffect, useState } from "react"
import { useDataContext } from "../context/DataContext";


function useWeather(query) {

    
    
    const [weather, setWeather] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        const fetchData = async (ip) => {
            console.log("calling api");
    
            try {
                //console.log(`https://api.weatherstack.com/current?access_key=99c800bd6e07822d6a19e518a802a48d&query=${query}`);
    
                const response = await fetch(`https://api.weatherstack.com/current?access_key=99c800bd6e07822d6a19e518a802a48d&query=${query}`);
                const res = await response.json(); 
                setWeather(res); 
            } catch (error) {
                setError(error);
                console.log("Error while calling the userdetailAPI:", error);
            } finally {
                setLoading(false);
            }
        };
    if(query){
        fetchData();
    }
    },[query])



    console.log(weather);
    
    
        return ({ weather, error, loading })

    


}


export default useWeather