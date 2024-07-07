import React from 'react'

function Projects() {
  return (
    <section className="bg-gray-100 py-16">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Have A Quick Look Some Of Our Works & Services</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="assets/img/home-one/service1.png" alt="Service" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-4">Interior Luggage Service</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">View Project</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="assets/img/home-one/service3.png" alt="Service" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-4">Plumbing Service</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">Learn More</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="assets/img/home-one/service5.png" alt="Service" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-4">House Luggage</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries</p>
            <a href="service-details.html" className="text-blue-600 hover:underline">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Projects