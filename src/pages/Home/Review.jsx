import React from 'react'

function Review() {
  return (
    <section className="py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">What clients Say About Us</h2>
      <div className="owl-carousel">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <img src="assets/img/home-one/review1.jpg" alt="Review" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-bold">Jason Doe</h3>
          <p className="text-gray-600">CEO</p>
          <div className="flex justify-center mt-4 space-x-1">
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
          </div>
          <p className="mt-4">There are many variations of passages of the Lorem Ipsum available an, but the majority have a suffered alteration in some form, by the injected a humour, or randomised words.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <img src="assets/img/home-one/review2.jpg" alt="Review" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-bold">Alina Decros</h3>
          <p className="text-gray-600">Manager</p>
          <div className="flex justify-center mt-4 space-x-1">
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
          </div>
          <p className="mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt quis quaerat eius ducimus officia aut vitae, vel repudiandae, accusantium beatae alias, aliquam consequuntur.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <img src="assets/img/home-one/review3.jpg" alt="Review" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-bold">Jac Jacson</h3>
          <p className="text-gray-600">Director</p>
          <div className="flex justify-center mt-4 space-x-1">
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
            <i className='bx bxs-star text-yellow-500'></i>
          </div>
          <p className="mt-4">There are many variations of passages of the Lorem Ipsum available an, but the majority have a suffered alteration in some form, by the injected a humour, or randomised words.</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Review