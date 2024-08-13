import React from 'react';
import logo from '../../img/home-two/logo3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-teal-800 text-white py-16">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <a href="index.html" className="flex items-center mb-4">
              <img src={logo} alt="logo2" className="h-28 transform hover:scale-110 transition-transform duration-300" />
            </a>
            <p className="hover:text-teal-200 transition-colors duration-300">Urloker offers secure and convenient luggage storage solutions for your home and office. </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-6 mb-8">
            <h3 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">Company</h3>
            <ul className="space-y-2">
              <li><a href="about.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">About</a></li>
              <li><a href="services.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Services</a></li>
              <li><a href="projects.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Projects</a></li>
              <li><a href="team.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Team</a></li>
              <li><a href="blog.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Blog</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">Support</h3>
            <ul className="space-y-2">
              <li><a href="faq.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">FAQ</a></li>
              <li><a href="privacy-policy.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="terms-and-conditions.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline hover:text-teal-200 transition-colors duration-300">Community</a></li>
              <li><a href="contact.html" className="hover:underline hover:text-teal-200 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">Contact Info</h3>
            <ul className="space-y-2">
              <li><span>Address: 52 MERLIN ST CRAIGIEBURN VIC 3064</span></li>
              <li><span>Email: <a href="mailto:admin@Urloker.com" className="hover:underline hover:text-teal-200 transition-colors duration-300">admin@Urloker.com</a></span></li>
              <li><span>Phone: <a href="tel:+0123456789" className="hover:underline hover:text-teal-200 transition-colors duration-300">+0123 456 789</a></span></li>
            </ul>
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl p-2">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="text-white hover:text-pink-600 transition-colors duration-300 text-3xl p-2">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl p-2">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl  p-2">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="hover:text-teal-200 transition-colors duration-300">Copyright &copy; {new Date().getFullYear()} Urloker. Designed By <a href="#" className="hover:underline hover:text-teal-200 transition-colors duration-300">EasytechInnovation</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
