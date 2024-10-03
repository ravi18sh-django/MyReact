import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import Input from "./Input";
import Button from "./Button";
import useWeather from "../hooks/useWeather";


function Weather() {
    const [stateWeather, setStateWeather] = useState({});
    const [location, setLocation] = useState("");
    const [inputLocation, setInputLocation] = useState("");
    const { Data } = useDataContext();
    const { weather, error, loading } = useWeather(location);

    useEffect(() => {
        if (weather) {
            setStateWeather(weather);
        }
    }, [weather]);

    console.log(stateWeather);



    useEffect(() => {
        if (Data) {
            setLocation(Data.city)
            setInputLocation(Data.city)
        }
    }, [Data])



    const callapi = (e) => {
        e.preventDefault();
        setLocation(inputLocation)
    }

    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">


            <h1 className="text-4xl font-extrabold text-white mb-10 tracking-wide">
                Weather App
            </h1>


            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Search Weather</h2>

                <form onSubmit={callapi} className="flex flex-col space-y-4">


                    <Input
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={inputLocation || ""}
                        onChange={(e) => setInputLocation(e.target.value)}
                        placeholder="Enter Location"
                    />


                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Get Weather
                    </button>
                </form>
            </div>

            {stateWeather.success==false? ("please enter correct StateName or Country")
            
            :
            
            (<div className="mt-10 bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Weather Data
                </h2>
                <div className="text-gray-600 space-y-4">
                    <div className="flex justify-between">
                        <p className="font-semibold"><strong>Location:</strong></p>
                        <p className="text-gray-900">{stateWeather.location?.name || "No Data"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold"><strong>Temperature:</strong></p>
                        <p className="text-gray-900">{stateWeather.current?.temperature || "No Data"}°C</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold"><strong>UV Index:</strong></p>
                        <p className="text-gray-900">{stateWeather.current?.uv_index || "No Data"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold"><strong>Humidity:</strong></p>
                        <p className="text-gray-900">{stateWeather.current?.humidity || "No Data"}%</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <img src={stateWeather.current?.weather_icons[0]} alt="Weather Icon" className="w-16 h-16" />
                </div>
            </div>)
        }
            

        </div>

    );

}

export default Weather;
