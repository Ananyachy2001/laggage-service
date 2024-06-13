import React from 'react';

const Footer = () => {
    return (
        <footer className="pt-24">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <div className="footer-item">
                            <div className="footer-logo2 mb-4">
                                <a href="index.html">
                                    <img src="./img/logo2.png" alt="logo2" className="w-32"/>
                                </a>
                                <p className="text-gray-600 mt-4">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <div className="footer-item">
                            <div className="footer-company">
                                <h3 className="text-lg font-semibold mb-4">Company</h3>
                                <ul className="text-gray-600">
                                    <li className="mb-2">
                                        <a href="about.html" target="_blank" className="hover:underline">About</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="services.html" target="_blank" className="hover:underline">Services</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="projects.html" target="_blank" className="hover:underline">Projects</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="team.html" target="_blank" className="hover:underline">Team</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="blog.html" target="_blank" className="hover:underline">Blog</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <div className="footer-item">
                            <div className="footer-company">
                                <h3 className="text-lg font-semibold mb-4">Support</h3>
                                <ul className="text-gray-600">
                                    <li className="mb-2">
                                        <a href="faq.html" target="_blank" className="hover:underline">FAQ</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="privacy-policy.html" target="_blank" className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="terms-and-conditions.html" target="_blank" className="hover:underline">Terms & Conditions</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" target="_blank" className="hover:underline">Community</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="contact.html" target="_blank" className="hover:underline">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                        <div className="footer-item">
                            <div className="footer-contact">
                                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                                <ul className="text-gray-600">
                                    <li className="mb-2">
                                        <span>Location: 6th Floor, Barbosa, Sidney</span>
                                    </li>
                                    <li className="mb-2">
                                        <span>Email: </span>
                                        <a href="mailto:info@Urlocker.com" target="_blank" className="hover:underline">info@Urlocker.com</a>
                                    </li>
                                    <li className="mb-2">
                                        <span>Phone: </span>
                                        <a href="tel:+0123456789" target="_blank" className="hover:underline">+0123 456 789</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-social mt-4">
                                <ul className="flex space-x-4">
                                    <li>
                                        <a href="#" target="_blank" className="text-gray-600 hover:text-gray-800">
                                            <i className='bx bxl-facebook'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank" className="text-gray-600 hover:text-gray-800">
                                            <i className='bx bxl-twitter'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank" className="text-gray-600 hover:text-gray-800">
                                            <i className='bx bxl-linkedin'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank" className="text-gray-600 hover:text-gray-800">
                                            <i className='bx bxl-instagram'></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-8 text-center">
                    <p className="text-gray-600">
                        Copyright &copy; <script>document.write(new Date().getFullYear())</script> Urlocker. Designed By 
                        <a href="https://hibootstrap.com/" target="_blank" className="hover:underline">HiBootstrap</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
