import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEye } from '@fortawesome/free-solid-svg-icons';
import furniture from '../../img/home-two/furniture-1.jpg';
import luggage from '../../img/home-two/luggage-1.jpg';
import hospital from '../../img/home-two/hospital-1.jpg';

function Blog() {
  const blogPosts = [
    {
      title: "Know More About Our Clean Furniture And Tools",
      author: "Admin",
      comments: 20,
      views: 11,
      imageUrl: furniture,
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries",
      detailsUrl: "blog-details.html"
    },
    {
      title: "We Are Doing Hospital Luggage For Social Work",
      author: "Admin",
      comments: 21,
      views: 15,
      imageUrl: hospital,
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries",
      detailsUrl: "blog-details.html"
    },
    {
      title: "We Work For You To Give Best Services",
      author: "Admin",
      comments: 22,
      views: 20,
      imageUrl: luggage,
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries",
      detailsUrl: "blog-details.html"
    }
  ];

  return (
    <section className="pt-20 pb-14 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Tourist Spots</h2>
          <p className="text-gray-500">Destinations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white transition duration-300 hover:shadow-xl rounded-lg overflow-hidden">
              <a href={post.detailsUrl}>
                <img src={post.imageUrl} alt="Blog" className="w-full h-56 object-cover transition duration-300 hover:scale-105" />
              </a>
              <div className="p-6">
                <h3 className="font-semibold text-lg leading-tight truncate">
                  <a href={post.detailsUrl} className="hover:text-blue-700 transition duration-300">{post.title}</a>
                </h3>
                <div className="mt-2">
                  <span className="text-gray-500">By: <a href="#" className="text-blue-700 hover:text-blue-800">{post.author}</a></span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gray-500 transition duration-300 hover:text-blue-700">
                    <FontAwesomeIcon icon={faComments} className="mr-2" />{post.comments} Comments
                  </span>
                  <span className="text-gray-500 transition duration-300 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEye} className="mr-2" />{post.views} Views
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{post.excerpt}</p>
                <a href={post.detailsUrl} className="inline-block mt-4 text-blue-600 hover:text-blue-700 hover:underline transition duration-300">
                  Read More <i className='bx bx-right-arrow-alt'></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
