import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 rounded-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center ">
                        <Link to="/" className= " mr-5 text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl  font-bold">
                            Currency Converter
                        </Link>
                    </div>
                    <div className="flex">
                        <Link
                            to="/Weather"
                            className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl  font-bold"
                        >
                            Weather App
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;