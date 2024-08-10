import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-multiple-datepicker';

const locationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    capacity: Yup.number().required('Required').typeError('Must be a number'),
    availableSpace: Yup.number().default(100), // Default value
    regularPrice: Yup.number().default(50), // Default value
    discountPercentage: Yup.number().default(10), // Default value
    availableFrom: Yup.date().required('Required'),
    availableTo: Yup.date().required('Required'),
    amenities: Yup.string().default('Wi-Fi, Parking'), // Default value
    notes: Yup.string().default('Default notes'), // Default value
    files: Yup.mixed().required('Required'),
    openTime: Yup.string().required('Required'),
    closeTime: Yup.string().required('Required'),
    closedDays: Yup.array().of(Yup.string()), // Optional validation
    specialClosedDays: Yup.array().of(Yup.date()), // Optional validation
    locationType: Yup.string().default('Other'), // Set default value
    timezone: Yup.string().default('Australia/Perth'), // Default value
});

const LocationForm = ({ onSubmit, location, loading }) => {
    const [previewPictures, setPreviewPictures] = useState([]);
    const [specialClosedDays, setSpecialClosedDays] = useState([]);

    return (
        <Formik
            initialValues={{
                name: location?.additionalDetails?.name || '',
                description: location?.additionalDetails?.description || '',
                street: location?.addressDetails?.street || '',
                city: location?.addressDetails?.city || '',
                state: location?.addressDetails?.state || '',
                zipCode: location?.addressDetails?.zipCode || '',
                country: location?.addressDetails?.country || '',
                capacity: location?.additionalDetails?.capacity || '',
                availableSpace: 100, // Default value
                regularPrice: 7.90, // Default value
                discountPercentage: 10, // Default value
                availableFrom: location?.additionalDetails?.availableFrom || new Date(), // Default to current date
                availableTo: location?.additionalDetails?.availableTo || new Date(new Date().setFullYear(new Date().getFullYear() + 10)), // Default to 10 years from now
                amenities: 'Wi-Fi, Parking', // Default value
                notes: 'Default notes', // Default value
                files: [],
                openTime: location?.additionalDetails?.openTime || '',
                closeTime: location?.additionalDetails?.closeTime || '',
                closedDays: location?.additionalDetails?.closedDays || [],
                specialClosedDays: location?.additionalDetails?.specialClosedDays || [],
                locationType: 'Other', // Set default value here
                timezone: location?.timezone || 'Australia/Perth', // Default value
            }}
            validationSchema={locationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue, isValid, isSubmitting }) => {
                useEffect(() => {
                    if (location?.addressDetails) {
                        setFieldValue('street', location.addressDetails.street);
                        setFieldValue('city', location.addressDetails.city);
                        setFieldValue('state', location.addressDetails.state);
                        setFieldValue('zipCode', location.addressDetails.zipCode);
                        setFieldValue('country', location.addressDetails.country);
                    }
                    if (location?.additionalDetails) {
                        setFieldValue('name', location.additionalDetails.name);
                        setFieldValue('description', location.additionalDetails.description);
                        setFieldValue('capacity', location.additionalDetails.capacity);
                        setFieldValue('openTime', location.additionalDetails.openTime);
                        setFieldValue('closeTime', location.additionalDetails.closeTime);
                        setFieldValue('timezone', location.timezone);
                    }
                }, [location, setFieldValue]);

                const handleFileChange = (event) => {
                    const files = event.currentTarget.files;
                    setFieldValue('files', files);

                    const filePreviews = Array.from(files).map(file => URL.createObjectURL(file));
                    setPreviewPictures(filePreviews);
                };

                const handleSpecialClosedDaysChange = (dates) => {
                    setSpecialClosedDays(dates);
                    setFieldValue('specialClosedDays', dates);
                };

                return (
                    <Form className="overflow-y-auto p-6 bg-white shadow-xl rounded-lg" style={{ maxHeight: '80vh' }}>
                        <div className="space-y-8">
                            <h6 className="text-2xl font-bold text-gray-800 mb-4">Location Details</h6>
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'description', label: 'Description' },
                                { name: 'street', label: 'Street' },
                                { name: 'city', label: 'City' },
                                { name: 'state', label: 'State' },
                                { name: 'zipCode', label: 'Post Code' },
                                { name: 'country', label: 'Country' },
                                { name: 'capacity', label: 'Capacity' },
                                { name: 'openTime', label: 'Open Time', type: 'time' },
                                { name: 'closeTime', label: 'Close Time', type: 'time' },
                            ].map(({ name, label, type = 'text' }) => (
                                <div key={name} className="form-group">
                                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                                        {label}
                                    </label>
                                    <Field
                                        as="input"
                                        name={name}
                                        type={type}
                                        className={`form-input mt-1 block w-full rounded-md border ${
                                            errors[name] && touched[name]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                    {errors[name] && touched[name] && (
                                        <div className="text-red-500 text-sm mt-1">{errors[name]}</div>
                                    )}
                                </div>
                            ))}
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Closed Days
                                </label>
                                <div className="mt-2 flex flex-wrap gap-3">
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                        <label key={day} className="inline-flex items-center">
                                            <Field type="checkbox" name="closedDays" value={day} className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500" />
                                            <span className="ml-2">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Special Closed Days
                                </label>
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <DatePicker
                                        onChange={handleSpecialClosedDaysChange}
                                        value={specialClosedDays}
                                        multiple
                                        className="w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-2">
                                    Pictures
                                </label>
                                <input
                                    id="files"
                                    name="files"
                                    type="file"
                                    multiple
                                    className={`form-input mt-1 block w-full rounded-md border ${
                                        errors.files && touched.files
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                    onChange={handleFileChange}
                                />
                                {errors.files && touched.files && (
                                    <div className="text-red-500 text-sm mt-1">{errors.files}</div>
                                )}
                                <div className="mt-4 flex flex-wrap gap-4">
                                    {previewPictures.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Preview ${index}`}
                                            className="h-20 w-20 object-cover rounded-lg shadow-md"
                                        />
                                    ))}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className={`bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out ${
                                    isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isSubmitting || !isValid}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                                        </svg>
                                        Loading...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LocationForm;
