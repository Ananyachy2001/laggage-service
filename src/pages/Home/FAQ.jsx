import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

function FAQ() {
  // Create a state to handle the toggle of each FAQ item
  const [openFAQ, setOpenFAQ] = useState({});

  const toggleFAQ = index => {
    setOpenFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }

  const faqs = [
    {
      question: "What can I store with Urloker?",
      answer: "From luggage and backpacks to gym bags and beyond, our service is like having a personal storage solution wherever you are. Whether you’re between Airbnbs or heading out for a night on the town, you can store more than just your luggage with us."
    },
    {
      question: "Are there size limits?",
      answer: "We welcome items of all sizes! However, for extra-large or bulky items like surfboards, skis, or bicycles, we kindly ask for prior approval to ensure our partners can accommodate your needs. Don’t worry—we’ll handle the coordination and keep you informed."
    },
    {
      question: "Do smaller bags cost less?",
      answer: " Absolutely! Enjoy lower rates when storing compact items such as purses, briefcases, and backpacks with us."
    },
    {
      question: "Is hourly luggage storage available at Urloker?",
      answer: " We offer a flat 24-hour rate, ensuring you get the same great price whether you store your items for just a few hours or the entire day."
    },
    {
      question: "Looking for luggage lockers nearby?",
      answer: " We partner with trusted businesses that provide secure storage areas for your belongings, offering the same safety and convenience as traditional lockers—without the hassle of availability or size constraints."
    },
    {
      question: "Need to change or cancel your booking? ",
      answer: "We understand that plans can change! Easily modify or cancel your booking right from the details page in our app. Adjust dates, drop-off and pick-up times, or the number of bags with just a few taps."
    },
    {
      question: "Can I get a refund if I cancel?",
      answer: " Absolutely! You can cancel your booking anytime before check-in for a full refund, and best of all—no cancellation fees!"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 transition duration-500 ease-in-out hover:text-gray-600">
          Have Any Questions? We Are Here To Answer You <FontAwesomeIcon icon={faQuestionCircle} />
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-3/4 px-4 mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-700 cursor-pointer flex items-center justify-between" onClick={() => toggleFAQ(index)}>
                    {faq.question}
                    {openFAQ[index] ? <FontAwesomeIcon icon={faMinusCircle} /> : <FontAwesomeIcon icon={faPlusCircle} />}
                  </h3>
                  {openFAQ[index] && (
                    <p className="text-gray-600 mt-2">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ;
