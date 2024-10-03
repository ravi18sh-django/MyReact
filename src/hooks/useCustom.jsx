import { useEffect, useState } from "react"

function useCustom(query) {

    const [Data, setData] = useState({});
    const [ipadd, setIpAdd] = useState(null);
    const [ipLocations, setIpLocations] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchIP = async () => {
            try {
                await fetch("https://api.ipify.org?format=json")
                    .then((response) => response.json())
                    .then((res) => {
                        setIpAdd(res.ip)
                    }
                    )

            } catch (error) {
                console.log("Error while fetching the ipadd: ", error);
            }
        }
        fetchIP();
    }, [])


    // useEffect(() => {
    //     const VisitorsData = JSON.parse(localStorage.getItem("VisitorsData"))
    //     if (VisitorsData && VisitorsData.length > 0) {
    //         setData(VisitorsData)
    //     }
    //     else{
    //         if(ipadd){
    //             fetchData(ipadd);

    //         }
    //     }
    // }, [ipadd])

    useEffect(() => {
        const VisitorsData = JSON.parse(localStorage.getItem("VisitorsData"));


        if (!VisitorsData || Object.keys(VisitorsData).length === 0) {
            if (ipadd) {
                fetchData(ipadd);
            }
        } else {
            setData(VisitorsData);
        }
    }, [ipadd]);


    useEffect(() => {
        localStorage.setItem("VisitorsData", JSON.stringify(Data))
    }, [Data])

    console.log(ipadd);



    const fetchData = async (ip) => {
        console.log("calling api");

        try {
            //console.log(`https://api.ipstack.com/${ip}?access_key=0c04f4bda90289d18f8cab8150a45b66`);

            const response = await fetch(`https://api.ipstack.com/${ipadd}?access_key=0c04f4bda90289d18f8cab8150a45b66`);
            const res = await response.json(); 
            setData(res); 
        } catch (error) {
            setError(error);
            console.log("Error while calling the userdetailAPI:", error);
        } finally {
            setLoading(false);
        }
    };

    if (query) {
        console.log("aagya inside");
        
        // const fetchMultiData = async () => {
        //     console.log("calling api");

        //     try {
        //         const response = await fetch(`https://api.ipstack.com/${query}?access_key=0c04f4bda90289d18f8cab8150a45b66`);
        //         const res = await response.json();
        //         setIpLocations(res);
        //     } catch (error) {
        //         setError(error);
        //         console.log("Error while calling the multipleIP:", error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchMultiData();

        return ({ ipLocations, error, loading })
    }
    else {
        return ({ Data, error, loading })

    }


}


export default useCustom