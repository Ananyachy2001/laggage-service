import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faComments, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

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
      question: 'How to register for a service?',
      answer: 'Simply navigate to our registration page and fill out the form. Support is available 24/7 if you need help.'
    },
    {
      question: 'How to get started?',
      answer: 'Begin by creating an account, then choose the service you need. You can start using our services immediately after signing up.'
    },
    {
      question: 'Adjust a schedule for Luggage?',
      answer: 'Adjusting your luggage pick-up schedule can be done through your user dashboard or by contacting our support team.'
    },
    {
      question: 'Any money return guarantee for unsatisfied service?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with our services.'
    },
    {
      question: 'Need a pricing plan?',
      answer: 'Our pricing plans are flexible to meet your needs. Visit the pricing section on our website for detailed information.'
    },
    {
      question: 'What if something is broken during clean?',
      answer: 'We are insured for damages. Report any issues immediately, and we will handle the situation as per our policy.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 transition duration-500 ease-in-out hover:text-gray-600">
          Have Any Questions ? We Are Here To Answer You <FontAwesomeIcon icon={faQuestionCircle} />
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-700 cursor-pointer" onClick={() => toggleFAQ(index)}>
                    {openFAQ[index] ? <FontAwesomeIcon icon={faMinusCircle} /> : <FontAwesomeIcon icon={faPlusCircle} />} {faq.question}
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
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <h5 className="text-2xl font-bold text-center text-gray-800 mb-6 transition duration-500 ease-in-out hover:text-blue-500">
                Chat with Us <FontAwesomeIcon icon={faComments} />
              </h5>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4" style={{ height: '200px', overflowY: 'auto' }} id="chat-messages">
                {/* Chat messages will be displayed here */}
              </div>
              <div className="flex">
                <input type="text" id="chat-input" className="flex-grow p-2 rounded-l border border-gray-300" placeholder="Type your message..." />
                <button className="bg-blue-600 text-white p-2 rounded-r" onClick={() => alert('Send message functionality is not implemented.')}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ;
