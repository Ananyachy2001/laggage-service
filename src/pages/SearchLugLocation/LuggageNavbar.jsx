import React from 'react';
import { Navbar, Dropdown } from 'flowbite-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';

const LuggageNavbar = () => (
    <Navbar fluid rounded className="fixed w-full p-9 z-10 top-0 left-0 shadow">
        <Navbar.Brand href="/">
            <span className="self-center text-xl font-semibold text-blue-600 whitespace-nowrap">URlocker</span>
        </Navbar.Brand>
        <div className="flex md:order-2 space-x-4">
            <a href="/faq" className="text-gray-600">FAQ</a>
            <a href="/menu" className="text-gray-600">Menu</a>
            <Dropdown label="English" inline>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
                <Dropdown.Item>French</Dropdown.Item>
            </Dropdown>
        </div>
        <div className="flex-1 flex justify-center md:order-1">
            <input
                type="text"
                placeholder="Sydney NSW, Australia"
                className="w-1/2 p-2 border border-gray-300 rounded"
            />
        </div>
    </Navbar>
);

export default LuggageNavbar;
