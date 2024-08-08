import React, { useState } from 'react';
import book from '../../img/home-two/book.jpg';
import lock from '../../img/home-two/lock.jpg';
import enjoy from '../../img/home-two/enjoy.jpg';
import guideline from '../../img/home-two/luggage-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faPlay } from '@fortawesome/free-solid-svg-icons';

function HowItWorks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#4A686A] mb-16">How it Works: A Quick Guide</h2>
        <div className="flex flex-wrap -mx-4 justify-center lg:justify-between">
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-6">
                <img src={book} alt="Book Icon" className="h-16 w-16 mr-6 object-contain" />
                <h3 className="text-2xl font-bold text-gray-800">Book</h3>
              </div>
              <p className="text-gray-600">Find your desired location easily using our website and proceed through Easy Booking, Unbeatable Prices with our secure online payments.</p>
            </div>
            <div className="flex justify-center mb-12">
              <FontAwesomeIcon icon={faArrowDown} className="text-3xl text-gray-600" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-6">
                <img src={lock} alt="Lock Icon" className="h-16 w-16 mr-6 object-contain" />
                <h3 className="text-2xl font-bold text-gray-800">Lock</h3>
              </div>
              <p className="text-gray-600">Simply show your booking confirmation to a store employee and leave your bags with us!</p>
            </div>
            <div className="flex justify-center mb-12">
              <FontAwesomeIcon icon={faArrowDown} className="text-3xl text-gray-600" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="flex items-center mb-6">
                <img src={enjoy} alt="Enjoy Icon" className="h-16 w-16 mr-6 object-contain" />
                <h3 className="text-2xl font-bold text-gray-800">Enjoy</h3>
              </div>
              <p className="text-gray-600">Explore freely, and when you’re ready, show your confirmation to collect your belongings! Your Bag Awaits – No Rush!</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mt-12 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full h-96 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <img src={guideline} alt="About" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <button onClick={openModal} className="bg-green-600 hover:bg-green-700 p-4 rounded-full text-white transition-colors">
                  <FontAwesomeIcon icon={faPlay} className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
            <button onClick={closeModal} className="absolute top-4 right-4 text-2xl text-gray-700">
              &times;
            </button>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/video_id"
                title="YouTube video"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HowItWorks;
