import React from 'react';
import './Projects.css'; 
import furniture from '../../img/home-two/furniture-1.jpg';
import plumbing from '../../img/home-two/plumbing-1.jpg';
import house from '../../img/home-two/house-1.jpg';

function Projects() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Have A Quick Look Some Of Our Works & Services</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="card bg-white p-6 rounded-lg shadow-md">
              <img src={furniture} alt="Service" className="mb-4 rounded-lg" />
              <h3 className="text-xl font-bold mb-4">Interior Luggage Service</h3>
              <p>Explore our diverse portfolio of projects showcasing our expertise in delivering exceptional services. Each endeavor reflects our commitment to quality craftsmanship and customer satisfaction, ensuring every detail exceeds expectations. Discover how we turn vision into reality with precision and care, transforming spaces into environments that inspire and endure.</p>
              <a href="service-details.html" className="hover:underline">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="card bg-white p-6 rounded-lg shadow-md">
              <img src={plumbing} alt="Service" className="mb-4 rounded-lg" />
              <h3 className="text-xl font-bold mb-4">Plumbing Service</h3>
              <p>Explore our diverse portfolio of projects showcasing our expertise in delivering exceptional services. Each endeavor reflects our commitment to quality craftsmanship and customer satisfaction, ensuring every detail exceeds expectations. Discover how we turn vision into reality with precision and care, transforming spaces into environments that inspire and endure.</p>
              <a href="service-details.html" className="hover:underline">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="card bg-white p-6 rounded-lg shadow-md">
              <img src={house} alt="Service" className="mb-4 rounded-lg" />
              <h3 className="text-xl font-bold mb-4">House Luggage</h3>
              <p>Explore our diverse portfolio of projects showcasing our expertise in delivering exceptional services. Each endeavor reflects our commitment to quality craftsmanship and customer satisfaction, ensuring every detail exceeds expectations. Discover how we turn vision into reality with precision and care, transforming spaces into environments that inspire and endure.</p>
              <a href="service-details.html" className="hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
