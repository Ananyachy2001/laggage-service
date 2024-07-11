import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEye, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
    <section className="pt-20 pb-14 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Tourist Spots</h2>
          <p className="text-xl text-gray-600">Explore Our Destinations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white transition duration-500 transform hover:-translate-y-2 hover:shadow-2xl rounded-lg overflow-hidden">
              <a href={post.detailsUrl} className="block">
                <img src={post.imageUrl} alt="Blog" className="w-full h-64 object-cover transition duration-500 transform hover:scale-110" />
              </a>
              <div className="p-6">
                <h3 className="font-semibold text-xl leading-tight truncate mb-2">
                  <a href={post.detailsUrl} className="hover:text-blue-600 transition duration-300">{post.title}</a>
                </h3>
                <div className="mb-4">
                  <span className="text-gray-500">By: 
                    <a href="#" className="inline-block bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 px-2 py-1 rounded ml-2">
                      {post.author}
                    </a>
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4 text-gray-500">
                  <span className="flex items-center transition duration-300 hover:text-blue-600">
                    <FontAwesomeIcon icon={faComments} className="mr-2" />{post.comments} Comments
                  </span>
                  <span className="flex items-center transition duration-300 hover:text-blue-600">
                    <FontAwesomeIcon icon={faEye} className="mr-2" />{post.views} Views
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href={post.detailsUrl} className="inline-flex items-center text-blue-600 hover:text-blue-700 transition duration-300 font-semibold">
                  Read More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
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
