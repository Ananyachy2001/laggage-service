import React, { useState } from 'react';
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
    availableSpace: Yup.number().required('Required').typeError('Must be a number'),
    regularPrice: Yup.number().required('Required').typeError('Must be a number'),
    discountPercentage: Yup.number().required('Required').typeError('Must be a number'),
    availableFrom: Yup.date().required('Required'),
    availableTo: Yup.date().required('Required'),
    amenities: Yup.string().required('Required'),
    notes: Yup.string().required('Required'),
    files: Yup.mixed().nullable(),
    openTime: Yup.string().required('Required'),
    closeTime: Yup.string().required('Required'),
    closedDays: Yup.array().of(Yup.string()).required('Required'),
    // specialClosedDays: Yup.array().of(Yup.date()).required('Required'),
    locationType: Yup.string().default('Other'), // Set default value
});

const EditLocationForm = ({ onSubmit, location, loading }) => {
    const [previewPictures, setPreviewPictures] = useState(location.pictures || []);
    const [specialClosedDays, setSpecialClosedDays] = useState(location.specialClosedDays || []);

    return (
        <Formik
            initialValues={{
                name: location.name || '',
                description: location.description || '',
                street: location.address?.street || '',
                city: location.address?.city || '',
                state: location.address?.state || '',
                zipCode: location.address?.zipCode || '',
                country: location.address?.country || '',
                capacity: location.capacity || '',
                availableSpace: location.availableSpace || '',
                regularPrice: location.regularPrice || '',
                discountPercentage: location.discountPercentage || '',
                availableFrom: location.availableFrom || '',
                availableTo: location.availableTo || '',
                amenities: location.amenities || '',
                notes: location.notes || '',
                files: null,
                openTime: location.openTime || '',
                closeTime: location.closeTime || '',
                closedDays: location.closedDays || [],
                specialClosedDays: location.specialClosedDays || [],
                locationType: location.locationType || 'Other',
                timezone: location.timezone || '',
            }}
            validationSchema={locationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue, isValid, isSubmitting }) => {
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
                            <h6 className="text-2xl font-bold text-gray-800 mb-4">Edit Location Details</h6>
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'description', label: 'Description' },
                                { name: 'street', label: 'Street' },
                                { name: 'city', label: 'City' },
                                { name: 'state', label: 'State' },
                                { name: 'zipCode', label: 'Zip Code' },
                                { name: 'country', label: 'Country' },
                                { name: 'capacity', label: 'Capacity' },
                                { name: 'availableSpace', label: 'Available Space' },
                                { name: 'regularPrice', label: 'Regular Price' },
                                { name: 'discountPercentage', label: 'Discount Percentage' },
                                { name: 'availableFrom', label: 'Available From', type: 'date' },
                                { name: 'availableTo', label: 'Available To', type: 'date' },
                                { name: 'amenities', label: 'Amenities (comma separated)' },
                                { name: 'notes', label: 'Notes' },
                                { name: 'openTime', label: 'Open Time', type: 'time' },
                                { name: 'closeTime', label: 'Close Time', type: 'time' },
                                { name: 'timezone', label: 'Timezone' },
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
                                {errors.closedDays && touched.closedDays && (
                                    <div className="text-red-500 text-sm mt-1">{errors.closedDays}</div>
                                )}
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
                                {errors.specialClosedDays && touched.specialClosedDays && (
                                    <div className="text-red-500 text-sm mt-1">{errors.specialClosedDays}</div>
                                )}
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
                                // disabled={isSubmitting || !isValid}
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

export default EditLocationForm;
