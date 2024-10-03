import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import useEuro from "../hooks/useEuro";

function EuroConverter() {
    const [amount, setAmount] = useState(0);
    const [convertTo, setConvertTo] = useState("INR");
    const { money, error, loading } = useEuro();
    const [convertedAmount, setConvertedAmount] = useState();

    const options = Object.keys(money.rates || {}); 
    const convert = (e) => {
        e.preventDefault(); 
        if (money.rates && amount > 0) {
            const convertedAmount = amount * money.rates[convertTo];
            setConvertedAmount(convertedAmount.toFixed(2)); 
        } else {
            setConvertedAmount("Invalid input or data not available");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-4 w-96">
                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Currency Converter</h1>

                    {loading && <p className="text-center text-gray-500">Loading rates...</p>}
                    {error && <p className="text-center text-red-500">Error fetching data!</p>}

                    <form className="space-y-4" onSubmit={convert}>
                        <div>
                            <label htmlFor="amount" className="block text-gray-600 font-medium">Amount</label>
                            <Input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="fromCurrency" className="block text-gray-600 font-medium">From</label>
                            <select
                                id="fromCurrency"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <option value="EUR">EUR - Euro</option>   
                            </select>
                        </div>

                        <div>
                            <label htmlFor="toCurrency" className="block text-gray-600 font-medium">To</label>
                            <select
                                id="toCurrency"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={convertTo}
                                onChange={(e) => setConvertTo(e.target.value)}
                            >
                                {options.map((key) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-500 text-white font-bold py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                        >
                            Convert
                        </Button>
                    </form>

                    <div id="result" className="mt-4 text-center text-gray-600">
                        {convertedAmount && (
                            <p className="text-xl font-semibold">
                                Converted Amount: {convertedAmount} {convertTo}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EuroConverter;
