import React from "react"
import { NavLink } from "react-router-dom"

function Header() {
    return (<>
        <header className="bg-blue-600 text-white">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <a href="#" className="hover:text-gray-200">MySite</a>
                </div>
                <ul className="flex space-x-6">
                    <li><NavLink to="/" className="hover:text-gray-200">IpGetter</NavLink></li>
                    <li><NavLink to="/weather" className="hover:text-gray-200">Weather</NavLink></li>
                    <li><NavLink to="/euroconverter" className="hover:text-gray-200">EuroConverter</NavLink></li>
                    <li><NavLink to="/appleshareinfo" className="hover:text-gray-200">ShareMarket</NavLink></li>
                </ul>
            </nav>
        </header>

    </>)
}

export default Header