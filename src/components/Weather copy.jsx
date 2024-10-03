import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import Input from "./Input";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Weather() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const { Data } = useDataContext();



    useEffect(() => {
        if (Data) {
            setLocation(Data.city)
        }
    }, [Data])



    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    const handleButtonClick = () => {
        console.log("Fetching weather for:", location);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
            
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-white mb-10 tracking-wide">
                Weather App
            </h1>
    
            {/* Form Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Search Weather</h2>
    
                <form className="flex flex-col space-y-4">
                    
                    {/* Date Pickers */}
                    <div className="flex space-x-4">
                        <label className="flex flex-col text-gray-700">
                            From
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                        <label className="flex flex-col text-gray-700">
                            To
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                    </div>
    
                    {/* Location Input */}
                    <Input
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={location || ""}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter Location"
                    />
    
                    {/* Submit Button */}
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Get Weather
                    </button>
                </form>
            </div>
    
            {/* Weather Data Section */}
            <div className="mt-10 bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Weather Data
                </h2>
    
                <div className="text-gray-600 space-y-2">
                    <p><strong>Location:</strong> <span className="text-gray-900">New York</span></p>
                    <p><strong>Temperature:</strong> <span className="text-gray-900">24°C</span></p>
                    <p><strong>Condition:</strong> <span className="text-gray-900">Clear Sky</span></p>
                    <p><strong>Humidity:</strong> <span className="text-gray-900">60%</span></p>
                </div>
            </div>
        </div>
    );
    
}

export default Weather;
