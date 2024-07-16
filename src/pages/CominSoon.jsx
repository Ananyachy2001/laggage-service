import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-gray-600 mb-4">We're working hard to bring you this feature. Stay tuned!</p>
        <div className="mt-4">
          <button
            onClick={goHome}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Go Back Home
          </button>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
