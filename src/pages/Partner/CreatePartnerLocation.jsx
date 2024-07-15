import React, { useState } from 'react';

const CreateLocation = ({ addLocation, setIsCreating }) => {
    const [newLocation, setNewLocation] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        discount: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!newLocation.id) newErrors.id = 'ID is required';
        if (!newLocation.name) newErrors.name = 'Name is required';
        if (!newLocation.description) newErrors.description = 'Description is required';
        if (!newLocation.price) newErrors.price = 'Price is required';
        if (newLocation.discount < 0 || newLocation.discount > 100) {
            newErrors.discount = 'Discount must be between 0 and 100';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addLocation(newLocation);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Create New Location</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">ID</label>
                        <input type="text" name="id" value={newLocation.id} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input type="text" name="name" value={newLocation.name} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea name="description" value={newLocation.description} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full"></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Price</label>
                        <input type="number" name="price" value={newLocation.price} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Discount</label>
                        <input type="number" name="discount" value={newLocation.discount} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLocation;