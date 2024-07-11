import React from 'react';
import './Choose.css'; // Import custom CSS for additional styling
import luggage1 from '../../img/home-two/luggage-1.jpg'
import luggage2 from '../../img/home-two/luggage-2.jpg'

const Choose = () => {
  return (
<div className="choose-area bg-white relative overflow-hidden py-12">
  <div className="choose-shape absolute inset-0 z-0">
    <img src="assets/img/home-one/choose1.png" alt="Shape" className="animate-spin-slow absolute top-[330px] left-[345px]" />
    <img src="assets/img/home-one/banner-shape3.png" alt="Shape" className="animate-pulse absolute right-[100px] bottom-[-40px]" />
  </div>
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center justify-between">
      <div className="lg:w-1/2 p-4">
        <div className="choose-content bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
            <img src={luggage1} alt="Luggage" className="rounded-lg" />
            <img src={luggage2} alt="Luggage" className="rounded-lg mt-4" />
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 p-4">
        <div className="choose-contact bg-white rounded-lg shadow-lg p-6">
          <div className="section-title text-left mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
          </div>
          <ul className="list-disc pl-5 space-y-3">
  <li>
    <strong className="font-semibold">Security Guaranteed:</strong> "Your bags are safe with us!" We ensure a 100% secure environment for your luggage, featuring comprehensive coverage and advanced surveillance systems. Enjoy peace of mind while you explore!
  </li>
  <li>
    <strong className="font-semibold">One Size Fits All:</strong> Whether it's a suitcase or a backpack, our flat rate covers all. No hidden fees, no size restrictions!
  </li>
  <li>
    <strong className="font-semibold">All-Day Access:</strong> Secure your luggage once and access it anytime throughout the day. Your belongings are safe and accessible whenever you need them.
  </li>
  <li>
    <strong className="font-semibold">Hassle-Free Booking:</strong> Experience our streamlined booking process! Easy steps, quick confirmation, and unbeatable prices all in one platform.
  </li>
  <li>
    <strong className="font-semibold">24/7 Customer Support:</strong> Our dedicated team is available around the clock to assist you. Got questions? Our chatbot and customer service are ready to help anytime!
  </li>
</ul>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Choose;
