import React, { useState } from 'react';
import logo from '../../img/home-two/logo3.svg';
import NavbarComp from '../Home/NavbarComp';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';

const ClientBooking = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <div className="container mx-auto mt-36 mb-12">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform duration-500 hover:shadow-2xl">
                  <h3 className="text-center text-2xl font-extrabold text-blue-700 mb-6 transition-transform duration-500 transform hover:scale-105">
                    User Booking of Luggage Shop
                  </h3>
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="emailAddress">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        id="emailAddress"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="storeDate">
                        Luggage Store Date
                      </label>
                      <input
                        type="date"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        id="storeDate"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="luggageQuantity">
                        Luggage Quantity
                      </label>
                      <input
                        type="number"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        id="luggageQuantity"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="comments">
                        Comments
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        id="comments"
                        rows="3"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      Request Luggage Store
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientBooking;
