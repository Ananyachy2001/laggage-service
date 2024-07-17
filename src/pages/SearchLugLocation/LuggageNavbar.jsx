import React from 'react';
import { Navbar, Dropdown } from 'flowbite-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';
import logo from '../../img/home-two/logo3.svg';

const LuggageNavbar = () => (
    <Navbar fluid rounded className="fixed w-full p-4 z-10 top-0 left-0 shadow bg-[#4A686A]">
        <div className="container mx-auto flex items-center justify-between">
            <Navbar.Brand href="/" className="flex items-center space-x-2">
                <img
                    src={logo}
                    alt="URlocker Logo"
                    className="h-20 w-24 mr-2 animate-spin-slow"
                />
                
            </Navbar.Brand>
            <div className="flex md:order-2 space-x-4 items-center text-white ">
                <a href="/comingsoon" className=" hover:text-[#FDB139] transition duration-300">FAQ</a>
                <Dropdown className='hover:text-[#FDB139]'  label="English" inline>
                    <Dropdown.Item className='hover:text-blue-600'>English</Dropdown.Item>
                    <Dropdown.Item className='hover:text-blue-600'>Spanish</Dropdown.Item>
                    <Dropdown.Item className='hover:text-blue-600'>Chinese</Dropdown.Item>
                    <Dropdown.Item className='hover:text-blue-600'>Arabic</Dropdown.Item>
                </Dropdown>
            </div>
            <div className="flex-1 flex justify-center md:order-1">
                <input
                    type="text"
                    placeholder=""
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                />
            </div>
        </div>
    </Navbar>
);

export default LuggageNavbar;
