import React from 'react'

function Service() {
  return (
    <section className="py-16">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">We Are Committed To Give Our Best Services</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <i className='bx bxs-car-wash text-4xl text-blue-600 mb-4'></i>
            <h3 className="text-xl font-bold mb-4">Car Washing</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">Learn More</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <i className='bx bxs-truck text-4xl text-blue-600 mb-4'></i>
            <h3 className="text-xl font-bold mb-4">Truck Washing</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">Learn More</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <i className='bx bx-building-house text-4xl text-blue-600 mb-4'></i>
            <h3 className="text-xl font-bold mb-4">Office Luggage</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">Learn More</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <i className='bx bx-home-alt text-4xl text-blue-600 mb-4'></i>
            <h3 className="text-xl font-bold mb-4">House Luggage</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Service