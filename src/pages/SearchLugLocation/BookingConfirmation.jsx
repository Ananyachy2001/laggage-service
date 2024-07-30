import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import NavbarComp from '../Home/NavbarComp';
import ClientNavbarComp from '../User/ClientNavbarComp'; // Assume ClientNavbarComp is correctly imported
import logo from '../../img/home-two/logo3.svg'; // Assume logo is in the assets folder

const BookingConfirmation = () => {
    const location = useLocation();
    const componentRef = useRef();
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const clientDetails = location.state?.clientDetails || {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA'
    };
    const totalPrice = location.state?.totalPrice || 120.00;
    const serviceOption = location.state?.serviceOption || 'Standard Service';
    const luggageQuantity = location.state?.luggageQuantity || 2;

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            html2canvas(componentRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save('booking-details.pdf');
                setIsDownloading(false);
            });
        }, 100); // Give a slight delay to ensure state change
    };

    return (
        <>
            {isLoggedIn ? <ClientNavbarComp /> : <NavbarComp />}
            <div className="container mx-auto mt-36 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                >
                    <div ref={componentRef} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                        <div className="flex justify-center mb-6">
                            <img src={logo} alt="Company Logo" className="w-36 h-auto" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-6 text-center">Booking Confirmation</h2>
                        <div className="mb-4">
                            <p className="mb-2"><strong>Booking #:</strong> 0000011</p>
                            <p className="mb-2"><strong>Booking Date:</strong> 02-29-2024</p>
                            <p className="mb-2"><strong>Name:</strong> {clientDetails.name}</p>
                            <p className="mb-2"><strong> Email:</strong> {clientDetails.email}</p>
                            <p className="mb-2"><strong> Phone:</strong> {clientDetails.phone}</p>
                            <p className="mb-2"><strong> Address:</strong> {clientDetails.address}</p>
                            <p className="mb-2"><strong>Service:</strong> {serviceOption}</p>
                            <p className="mb-2"><strong>Number of Bags:</strong> {luggageQuantity}</p>
                            <p className="mb-2"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-center">
                            {!isDownloading && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4"
                                    onClick={handleDownload}
                                >
                                    Download Details
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default BookingConfirmation;
