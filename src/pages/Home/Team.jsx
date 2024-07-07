import React from 'react'

function Team() {
  return (
    <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expert Team Members</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="assets/img/home-two/team-1.jpg" alt="Team" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold">Thomas Smith</h3>
                <p className="text-gray-600">Manager</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-facebook'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-twitter'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-linkedin'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-instagram'></i></a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="assets/img/home-two/team-1.jpg" alt="Team" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold">Jansy Henry</h3>
                <p className="text-gray-600">Engineer</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-facebook'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-twitter'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-linkedin'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-instagram'></i></a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="assets/img/home-two/team-1.jpg" alt="Team" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold">Diyana Pari</h3>
                <p className="text-gray-600">Staff</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-facebook'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-twitter'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-linkedin'></i></a>
                  <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600"><i className='bx bxl-instagram'></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Team