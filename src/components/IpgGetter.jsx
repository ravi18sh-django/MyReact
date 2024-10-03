import React, { useState, useEffect } from "react";
import { useDataContext } from "../context/DataContext";
import Input from "./Input";
import Button from "./Button";

function IpGetter() {
    const [ipvalue, setIpValue] = useState("");
    const { Data } = useDataContext();
    const [ipLocations, setIpLocations] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Data && Data.ip) {
            setIpValue(Data.ip);
        }
    }, [Data]);

    const handleInputChange = (e) => {
        setIpValue(e.target.value);
    };

    const renderDataValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <ul className="list-inside pl-4">
                    {Object.entries(value).map(([subKey, subValue], index) => (
                        <li key={index} className="text-xs">
                            <strong>{subKey}:</strong> {renderDataValue(subValue)}
                        </li>
                    ))}
                </ul>
            );
        }
        return String(value);
    };

    const callapi = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setIpLocations(null);

        try {
            const response = await fetch(`https://api.ipstack.com/${ipvalue}?access_key=0c04f4bda90289d18f8cab8150a45b66`);
            const res = await response.json();
            setIpLocations(res);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">IP Location Finder</h2>
            <form onSubmit={callapi} className="flex gap-4 mb-4">
                <Input
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={ipvalue}
                    onChange={handleInputChange}
                    placeholder="Enter IP address"
                />
                <Button
                    children="Find IP Location"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    type="submit"
                />
            </form>

            <div className="mt-4">
                {loading && <p className="text-blue-500">Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {ipLocations ? (
                    <>
                        <h3 className="text-lg font-bold">Data for IP Address:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {Object.entries(ipLocations).map(([key, value], index) => (
                                <li key={index} className="text-sm">
                                    <strong>{key}:</strong> {renderDataValue(value)}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <>
                        {!loading && !error && (
                            <>
                                <h3 className="text-lg font-bold">Data from IP Add API:</h3>
                                {Data ? (
                                    <ul className="list-disc pl-5 space-y-2">
                                        {Object.entries(Data).map(([key, value], index) => (
                                            <li key={index} className="text-sm">
                                                <strong>{key}:</strong> {renderDataValue(value)}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No data available from Context API.</p>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default IpGetter;
