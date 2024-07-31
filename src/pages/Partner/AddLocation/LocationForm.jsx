import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const locationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    district: Yup.string().required('Required'),
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
    pictures: Yup.string().required('Required'),
    openTime: Yup.string().required('Required'),
    closeTime: Yup.string().required('Required'),
    locationType: Yup.string().required('Required'),
});

const LocationForm = ({ onSubmit, location }) => {
    return (
        <Formik
            initialValues={{
                name: location?.additionalDetails?.name || '',
                description: location?.additionalDetails?.description || '',
                street: location?.addressDetails?.street || '',
                district: location?.addressDetails?.district || '',
                city: location?.addressDetails?.city || '',
                state: location?.addressDetails?.state || '',
                zipCode: location?.addressDetails?.zipCode || '',
                country: location?.addressDetails?.country || '',
                capacity: location?.additionalDetails?.capacity || '',
                availableSpace: location?.additionalDetails?.availableSpace || '',
                regularPrice: location?.additionalDetails?.regularPrice || '',
                discountPercentage: location?.additionalDetails?.discountPercentage || '',
                availableFrom: location?.additionalDetails?.availableFrom || '',
                availableTo: location?.additionalDetails?.availableTo || '',
                amenities: location?.additionalDetails?.amenities || '',
                notes: location?.additionalDetails?.notes || '',
                pictures: location?.additionalDetails?.pictures.join(', ') || '',
                openTime: location?.additionalDetails?.openTime || '',
                closeTime: location?.additionalDetails?.closeTime || '',
                locationType: location?.additionalDetails?.locationType || '',
                timezone: location?.timezone || '', 
            }}
            validationSchema={locationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue, isValid, isSubmitting }) => {
                useEffect(() => {
                    if (location.addressDetails) {
                        setFieldValue('street', location.addressDetails.street);
                        setFieldValue('district', location.addressDetails.district);
                        setFieldValue('city', location.addressDetails.city);
                        setFieldValue('state', location.addressDetails.state);
                        setFieldValue('zipCode', location.addressDetails.zipCode);
                        setFieldValue('country', location.addressDetails.country);
                    }
                    if (location.additionalDetails) {
                        setFieldValue('name', location.additionalDetails.name);
                        setFieldValue('description', location.additionalDetails.description);
                        setFieldValue('capacity', location.additionalDetails.capacity);
                        setFieldValue('availableSpace', location.additionalDetails.availableSpace);
                        setFieldValue('regularPrice', location.additionalDetails.regularPrice);
                        setFieldValue('discountPercentage', location.additionalDetails.discountPercentage);
                        setFieldValue('availableFrom', location.additionalDetails.availableFrom);
                        setFieldValue('availableTo', location.additionalDetails.availableTo);
                        setFieldValue('amenities', location.additionalDetails.amenities);
                        setFieldValue('notes', location.additionalDetails.notes);
                        setFieldValue('pictures', location.additionalDetails.pictures.join(', '));
                        setFieldValue('openTime', location.additionalDetails.openTime);
                        setFieldValue('closeTime', location.additionalDetails.closeTime);
                        setFieldValue('locationType', location.additionalDetails.locationType);
                        setFieldValue('timezone', location.timezone);
                    }
                }, [location, setFieldValue]);

                return (
                    <Form className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                        <div className="space-y-4">
                            <h6 className="text-xl font-semibold">Location Details</h6>
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'description', label: 'Description' },
                                { name: 'street', label: 'Street' },
                                { name: 'district', label: 'District' },
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
                                { name: 'pictures', label: 'Pictures (URLs, comma separated)' },
                                { name: 'openTime', label: 'Open Time', type: 'time' },
                                { name: 'closeTime', label: 'Close Time', type: 'time' },
                                { name: 'locationType', label: 'Location Type' },
                                { name: 'timezone', label: 'Timezone' }, 
                            ].map(({ name, label, type = 'text' }) => (
                                <div key={name} className="form-group">
                                    <Field
                                        as="input"
                                        name={name}
                                        type={type}
                                        placeholder={label}
                                        className={`form-input mt-1 block w-full rounded-md ${
                                            errors[name] && touched[name]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                    />
                                    {errors[name] && touched[name] && (
                                        <div className="text-red-500 text-sm">{errors[name]}</div>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="submit" 
                                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting || !isValid}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LocationForm;
