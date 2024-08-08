import React, { useState } from "react";
import review1 from '../../img/home-two/team-1.jpg';
import review2 from '../../img/home-two/team-1.jpg';
import review3 from '../../img/home-two/team-1.jpg';

const reviews = [
  {
    name: "Jason Doe",
    position: "Client",
    image: review1,
    text: "The luggage service provided by this company is exceptional. Their attention to detail and commitment to quality have greatly enhanced our travel experience. Highly recommended!",
    rating: 5
  },
  {
    name: "Alina Decros",
    position: "Client",
    image: review2,
    text: "I have been thoroughly impressed with the luggage services. From prompt delivery to the pristine condition of the luggage, everything was perfect. Their professionalism is unmatched.",
    rating: 5
  },
  {
    name: "Jac Jacson",
    position: "Client",
    image: review3,
    text: "Outstanding service! The team goes above and beyond to ensure customer satisfaction. The luggage quality is top-notch and their support is always there when you need it.",
    rating: 5
  }
];

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, position, image, text, rating } = reviews[index];

  const checkIndex = (number) => {
    if (number > reviews.length - 1) {
      return 0;
    }
    if (number < 0) {
      return reviews.length - 1;
    }
    return number;
  };

  const nextReview = () => {
    setIndex((currentIndex) => checkIndex(currentIndex + 1));
  };

  const prevReview = () => {
    setIndex((currentIndex) => checkIndex(currentIndex - 1));
  };

  const randomReview = () => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * reviews.length);
    } while (randomNumber === index);
    setIndex(randomNumber);
  };

  return (
    <section className="bg-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">What Clients Say About Us</h2>
        <div className="max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition ease-in-out duration-500 transform hover:scale-105">
          <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mt-4 border-4 border-primary-500 transition ease-in-out duration-500 hover:shadow-lg" />
          <div className="text-center px-6 py-4">
            <h3 className="text-xl font-bold text-primary-700">{name}</h3>
            <p className="text-gray-700">{position}</p>
            <div className="flex justify-center mt-4">
              {[...Array(rating)].map((_, i) => (
                <i key={i} className='bx bxs-star text-yellow-500'></i>
              ))}
            </div>
            <p className="mt-4 text-gray-900 overflow-hidden" style={{ maxHeight: "6em", textOverflow: "ellipsis" }}>{text}</p>
          </div>
          <div className="flex justify-around items-center p-4">
            <button onClick={prevReview} className="text-gray-900 hover:text-primary-300 transform hover:scale-125 transition-transform duration-300">
              <i className='bx bx-chevron-left text-2xl'></i>
            </button>
            <button onClick={randomReview} className="px-4 py-2 text-l text-gray-900 hover:text-primary-300 transform hover:scale-125 transition-transform duration-300 bg-indigo-400 rounded-full shadow">
              Random
            </button>
            <button onClick={nextReview} className="text-gray-900 hover:text-primary-300 transform hover:scale-125 transition-transform duration-300">
              <i className='bx bx-chevron-right text-2xl'></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
