import React, { createContext, useContext, useState, useEffect } from "react";
import useCustom from "../hooks/useCustom";

const defaultContextValue = {
    Data: {},
    loading: false,
    error: null,
    setData: () => {},
};

const DataContext = createContext(defaultContextValue);

export function DataProvider({ children }) {
    const [Data, setData] = useState({});
    const { Data: apiData, loading, error } = useCustom(); 

    useEffect(() => {
        if (apiData && Object.keys(apiData).length > 0) {
            setData(apiData); 
        }
    }, [apiData]);

    return (
        <DataContext.Provider value={{ Data, loading, error, setData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => {
    return useContext(DataContext);
};
