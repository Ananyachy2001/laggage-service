import React from 'react'

function HowitWorks() {
  return (
    <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">How it Works: A Quick Guide</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <img src="/assets/img/home-two/book.jpg" alt="Book Icon" className="h-12 w-12 mr-4" />
                  <h3 className="text-xl font-bold">Book</h3>
                </div>
                <p>Find your desired location easily using our website and proceed through Easy Booking, Unbeatable Prices with our secure online payments.</p>
              </div>
              <div className="flex justify-center mb-8">
                <i className="fas fa-arrow-down text-2xl text-gray-600"></i>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <img src="/assets/img/home-two/lock.jpg" alt="Lock Icon" className="h-12 w-12 mr-4" />
                  <h3 className="text-xl font-bold">Lock</h3>
                </div>
                <p>Simply show your booking confirmation to a store employee and leave your bags with us!</p>
              </div>
              <div className="flex justify-center mb-8">
                <i className="fas fa-arrow-down text-2xl text-gray-600"></i>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src="/assets/img/home-two/enjoy.jpg" alt="Enjoy Icon" className="h-12 w-12 mr-4" />
                  <h3 className="text-xl font-bold">Enjoy</h3>
                </div>
                <p>Explore freely, and when you’re ready, show your confirmation to collect your belongings! Your Bag Awaits – No Rush!</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="relative">
                <img src="assets/img/home-two/luggage-1.jpg" alt="About" className="w-full rounded-lg shadow-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="https://www.youtube.com/watch?v=Dviu-D3Fijo" className="bg-black bg-opacity-50 p-4 rounded-full text-white">
                    <i className='bx bx-play text-4xl'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HowitWorks