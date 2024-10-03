import { useEffect, useState } from "react"
import { useDataContext } from "../context/DataContext";


function useEuro() {

    
    
    const [money, setMoney] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        const fetchData = async (ip) => {
            console.log("calling api");
    
            try {
                //console.log(`https://api.weatherstack.com/current?access_key=99c800bd6e07822d6a19e518a802a48d&query=${query}`);
    
                const response = await fetch(`http://data.fixer.io/api/latest?access_key=9fedc5353556b2bdc443fa037cd59dfc`);
                const res = await response.json(); 
                setMoney(res); 
            } catch (error) {
                setError(error);
                console.log("Error while calling the userdetailAPI:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    
    },[])



    console.log(money);
    
    
        return ({ money, error, loading })

    


}


export default useEuro
