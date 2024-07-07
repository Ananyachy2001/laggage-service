import React from 'react'
import logo from '../../img/home-two/logo3.svg';

function Footer() {
  return (
    <footer className="bg-teal-800 text-white py-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <a href="index.html" className="flex items-center mb-4">
                <img src={logo} alt="logo2" className="h-28" />
              </a>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic.</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="about.html" className="hover:underline">About</a></li>
                <li><a href="services.html" className="hover:underline">Services</a></li>
                <li><a href="projects.html" className="hover:underline">Projects</a></li>
                <li><a href="team.html" className="hover:underline">Team</a></li>
                <li><a href="blog.html" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="faq.html" className="hover:underline">FAQ</a></li>
                <li><a href="privacy-policy.html" className="hover:underline">Privacy Policy</a></li>
                <li><a href="terms-and-conditions.html" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
                <li><a href="contact.html" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li><span>Location: 6th Floor, Barbosa, Sidney</span></li>
                <li><span>Email: <a href="mailto:info@Urlocker.com" className="hover:underline">info@Urlocker.com</a></span></li>
                <li><span>Phone: <a href="tel:+0123456789" className="hover:underline">+0123 456 789</a></span></li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-blue-600"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="text-white hover:text-blue-600"><i className='bx bxl-twitter'></i></a>
                <a href="#" className="text-white hover:text-blue-600"><i className='bx bxl-linkedin'></i></a>
                <a href="#" className="text-white hover:text-blue-600"><i className='bx bxl-instagram'></i></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p>Copyright &copy; {new Date().getFullYear()} Urlocker. Designed By <a href="#" className="hover:underline">EasytechInnovation</a></p>
          </div>
        </div>
      </footer>
  )
}

export default Footer