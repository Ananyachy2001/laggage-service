// components/Reservations.js

import React from 'react';
import Header from '../../partials/Header'; // Replace with actual path to Header component
import Sidebar from '../../partials/Sidebar'; // Replace with actual path to Sidebar component
import { Card } from 'flowbite-react'; // Assuming you have a Card component similar to the example

// Dummy data (replace with actual fetched data from API)
const dummyReservations = [
  {
    id: 1,
    hostId: 'host_id_1',
    storageSlotId: 'slot_id_1',
    startDate: '2024-06-15T10:00:00Z',
    endDate: '2024-06-20T10:00:00Z',
    luggageDetails: {
      weight: 20,
      size: 'large',
    },
  },
  {
    id: 2,
    hostId: 'host_id_2',
    storageSlotId: 'slot_id_2',
    startDate: '2024-06-16T10:00:00Z',
    endDate: '2024-06-21T10:00:00Z',
    luggageDetails: {
      weight: 15,
      size: 'medium',
    },
  },
  // Add more dummy data as needed
];

const ReservationCard = ({ reservation }) => {
  return (
    <Card className="bg-white shadow-md rounded-md p-4">
      <p className="text-lg font-semibold mb-2">Reservation ID: {reservation.id}</p>
      <p><span className="font-semibold">Start Date:</span> {reservation.startDate}</p>
      <p><span className="font-semibold">End Date:</span> {reservation.endDate}</p>
      <p><span className="font-semibold">Host ID:</span> {reservation.hostId}</p>
      <p><span className="font-semibold">Storage Slot ID:</span> {reservation.storageSlotId}</p>
      <p><span className="font-semibold">Luggage Details:</span></p>
      <ul className="list-disc pl-6">
        <li><span className="font-semibold">Weight:</span> {reservation.luggageDetails.weight} kg</li>
        <li><span className="font-semibold">Size:</span> {reservation.luggageDetails.size}</li>
      </ul>
    </Card>
  );
};

const Reservations = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-7 py-12 px-6 ">
          <h1 className="text-3xl font-semibold mb-8">Your Reservations</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dummyReservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
