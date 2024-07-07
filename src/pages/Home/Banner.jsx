import React from 'react'

function Banner() {
  return (
    
    <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: 'url(assets/img/banner-bg.jpg)' }}>
    <div className="text-center text-white">
      <h1 className="text-4xl font-bold">Freedom in Every Journey</h1>
      <p className="mt-4">Looking For Luggage Services! We Are Here...</p>
      <form id="locationForm" className="mt-6">
        <div className="flex justify-center items-center">
          <input type="text" id="location" list="location-suggestions" className="form-input w-64 p-2 rounded-l" placeholder="Enter your location" />
          <datalist id="location-suggestions">
            <option value="Sydney"></option>
            <option value="Canberra"></option>
            <option value="Melbourne"></option>
            <option value="Brisbane"></option>
            <option value="Darwin"></option>
          </datalist>
          <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-r">Search</button>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white p-2 mt-4 rounded">Find Closest Locations To Book</button>
      </form>
    </div>
  </div>
  
  )
}

export default Banner