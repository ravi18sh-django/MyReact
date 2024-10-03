import React, { forwardRef } from "react";

const Input = forwardRef(({ clasname, ...props }, ref) => {
    return (
        <>
            <input
                type="text"
                ref={ref}
                className={`${clasname} border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...props}
            />
        </>
    );
});

export default Input;
