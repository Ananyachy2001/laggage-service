// src/components/BookingConfirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import NavbarComp from '../Home/NavbarComp';

const BookingConfirmation = () => {
    const location = useLocation();
    console.log(location.state); // Log the location state
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
        const doc = new jsPDF();

        doc.text('Booking Confirmation', 10, 10);
        doc.text(`Name: ${clientDetails.name}`, 10, 20);
        doc.text(`Email: ${clientDetails.email}`, 10, 30);
        doc.text(`Phone: ${clientDetails.phone}`, 10, 40);
        doc.text(`Address: ${clientDetails.address}`, 10, 50);
        doc.text(`Service: ${serviceOption}`, 10, 60);
        doc.text(`Number of Bags: ${luggageQuantity}`, 10, 70);
        doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 10, 80);

        doc.save('booking-details.pdf');
    };

    return (
        <>
            <NavbarComp />
            <div className="container mx-auto mt-32 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                >
                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Booking Confirmation</h2>
                        <p className="mb-4"><strong>Name:</strong> {clientDetails.name}</p>
                        <p className="mb-4"><strong>Email:</strong> {clientDetails.email}</p>
                        <p className="mb-4"><strong>Phone:</strong> {clientDetails.phone}</p>
                        <p className="mb-4"><strong>Address:</strong> {clientDetails.address}</p>
                        <p className="mb-4"><strong>Service:</strong> {serviceOption}</p>
                        <p className="mb-4"><strong>Number of Bags:</strong> {luggageQuantity}</p>
                        <p className="mb-4"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                        <div className="flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4"
                                onClick={handleDownload}
                            >
                                Download Details
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default BookingConfirmation;
