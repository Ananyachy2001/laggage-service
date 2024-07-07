import React from 'react'

function FAQ() {
  return (
    <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Have Any Question! We Are Here To Answer You</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  <li>
                    <h3 className="text-lg font-bold">How to register for a service?</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                  </li>
                  <li>
                    <h3 className="text-lg font-bold">How to get started?</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                  </li>
                  <li>
                    <h3 className="text-lg font-bold">Adjust a schedule for Luggage?</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                  </li>
                  <li>
                    <h3 className="text-lg font-bold">Any money return guarenty for unsatisfy service?</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                  </li>
                  <li>
                    <h3 className="text-lg font-bold">Need a pricing plan..</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                  </li>
                  <li>
                    <h3 className="text-lg font-bold">What if something broken during clean?</h3>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-bold text-center mb-4">Chat with Us</h5>
                <div className="bg-white p-4 rounded-lg shadow-md mb-4" style={{ height: '200px', overflowY: 'auto' }} id="chat-messages">
                  {/* Chat messages will be displayed here */}
                </div>
                <div className="flex">
                  <input type="text" id="chat-input" className="flex-grow p-2 rounded-l border" placeholder="Type your message..." />
                  <button className="bg-blue-600 text-white p-2 rounded-r" onClick={() => alert('Send message functionality is not implemented.')}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default FAQ