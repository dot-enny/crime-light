import React from "react";
import { buttler } from "../assets";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-[#D9D9D9] text-black flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src={buttler} alt="buttler" />
                </div>
                <span className="text-xl font-bold tracking-wider">BUTLER</span>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
                <Link to="#">
                    <p className="text-black visited:text-black active:text-black transition-colors tracking-wider">ABOUT</p>
                </Link>
                <Link to="#">
                    <p className="text-black visited:text-black active:text-black transition-colors tracking-wider">SERVICES</p>
                </Link>
                <Link to="#">
                    <p className="text-black visited:text-black active:text-black transition-colors tracking-wider">CONTACT</p>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
