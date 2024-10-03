import React from "react"

function Footer() {
    return (<>
        
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Ip Getter</h3>
                    <p>It will show the data of the provided ip add</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Weather Teller</h3>
                    <p>It will provide the weather info of the Provided State or Country</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">EuroConverter</h3>
                    <p>This is an Euro converter to your desired currency</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Share Market Value info</h3>
                    <p>This will tell you about the market graph of Apple Company</p>
                </div>
            </div>
        </footer>


    </>)
}

export default Footer