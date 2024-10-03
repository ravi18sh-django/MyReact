import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2"; 
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-date-fns';




function ShareMarket() {
    const [startDate, setStartDate] = useState(new Date("2024-09-20"));
    const [endDate, setEndDate] = useState(new Date("2024-09-30"));
    const [chartData, setChartData] = useState(null);


   // console.log(startDate.toISOString().slice(0, 10));


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://api.marketstack.com/v1/eod?access_key=9fcd058853174af2e88111ed0e6e2243&symbols=AAPL&date_from=${startDate.toISOString().slice(0, 10)}&date_to=${endDate.toISOString().slice(0, 10)}`
            );
            const data = await response.json();

                //console.log(data);
                

            
            processStockData(data);
        };

        fetchData();
    }, [startDate, endDate]);

    const processStockData = (data) => {
        const sortedData = data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const labels = sortedData.map((item) => item.date.slice(0, 10));
        const prices = sortedData.map((item) => item.close);

        setChartData({
            labels,
            datasets: [
                {
                    label: `AAPL Stock Price`,
                    data: prices,
                    fill: false,
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: "rgba(75, 192, 192, 0.2)",
                },
            ],
        });
    };





    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'DD MMM YYYY',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USD)',
                },
            },
        },
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">AAPL Stock Chart</h1>

                <div className="flex space-x-4 mb-6 justify-center">
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

                <div className="w-full h-96">
                    {chartData ? (
                        <Line data={chartData} options={chartOptions} />
                    ) : (
                        <p className="text-center text-gray-500">Loading chart data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}



export default ShareMarket;
