import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../../config';

const adminLocationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    district: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    regularPrice: Yup.number().required('Required').typeError('Must be a number'),
    discountPercentage: Yup.number().required('Required').typeError('Must be a number'),
    priceCurrency: Yup.string().required('Required'),
    url: Yup.string().required('Required'),
    openTime: Yup.string().required('Required'),
    closeTime: Yup.string().required('Required'),
    closedDays: Yup.string().required('Required'),
    specialClosedDays: Yup.string().required('Required'),
    locationType: Yup.string().required('Required'),
    pictures: Yup.string().required('Required'),
    notes: Yup.string().required('Required'),
    availableFrom: Yup.date().required('Required'),
    availableTo: Yup.date().required('Required'),
});

const AdminLocationForm = ({ onSubmit, location }) => {
    useEffect(() => {
        if (location.additionalDetails) {
            // Fetch picture URLs from Google API
            const fetchPictures = async () => {
                try {
                    const response = await axios.get(
                        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.placeId}&fields=photos&key=${config.GOOGLE_API_KEY}`
                    );
                    const pictures = response.data.result.photos.map(
                        (photo) =>
                            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${config.GOOGLE_API_KEY}`
                    );
                    location.additionalDetails.pictures = pictures.join(', ');
                } catch (error) {
                    console.error('Error fetching pictures:', error);
                }
            };

            fetchPictures();
        }
    }, [location]);

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
                regularPrice: location?.additionalDetails?.regularPrice || '',
                discountPercentage: location?.additionalDetails?.discountPercentage || '',
                priceCurrency: location?.additionalDetails?.priceCurrency || '',
                url: location?.additionalDetails?.url || '',
                openTime: location?.additionalDetails?.openTime || '',
                closeTime: location?.additionalDetails?.closeTime || '',
                closedDays: location?.additionalDetails?.closedDays.join(', ') || 'Saturday, Sunday',
                specialClosedDays: location?.additionalDetails?.specialClosedDays.join(', ') || 'Christmas, New Year\'s Day',
                locationType: location?.additionalDetails?.locationType || '',
                pictures: location?.additionalDetails?.pictures || '',
                notes: location?.additionalDetails?.notes || '',
                availableFrom: location?.additionalDetails?.availableFrom || '',
                availableTo: location?.additionalDetails?.availableTo || '',
                isDeleted: location?.additionalDetails?.isDeleted || false,
                isActive: location?.additionalDetails?.isActive || true,
                createdBy: location?.additionalDetails?.createdBy || '668ed370fcc737acf40fa741',
            }}
            validationSchema={adminLocationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue, isValid, isSubmitting }) => (
                <Form className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                    <div className="space-y-4">
                        <h6 className="text-xl font-semibold">Admin Location Details</h6>
                        {[
                            { name: 'name', label: 'Name' },
                            { name: 'description', label: 'Description' },
                            { name: 'street', label: 'Street' },
                            { name: 'district', label: 'District' },
                            { name: 'city', label: 'City' },
                            { name: 'state', label: 'State' },
                            { name: 'zipCode', label: 'Zip Code' },
                            { name: 'country', label: 'Country' },
                            { name: 'regularPrice', label: 'Regular Price' },
                            { name: 'discountPercentage', label: 'Discount Percentage' },
                            { name: 'priceCurrency', label: 'Price Currency' },
                            { name: 'url', label: 'URL' },
                            { name: 'openTime', label: 'Open Time', type: 'time' },
                            { name: 'closeTime', label: 'Close Time', type: 'time' },
                            { name: 'closedDays', label: 'Closed Days (comma separated)' },
                            { name: 'specialClosedDays', label: 'Special Closed Days (comma separated)' },
                            { name: 'locationType', label: 'Location Type' },
                            { name: 'pictures', label: 'Pictures (URLs, comma separated)' },
                            { name: 'notes', label: 'Notes' },
                            { name: 'availableFrom', label: 'Available From', type: 'date' },
                            { name: 'availableTo', label: 'Available To', type: 'date' },
                        ].map(({ name, label, type = 'text' }) => (
                            <div key={name} className="form-group">
                                <Field
                                    as="input"
                                    name={name}
                                    type={type}
                                    placeholder={label}
                                    className={`form-input mt-1 block w-full rounded-md ${
                                        errors[name] && touched[name] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors[name] && touched[name] && (
                                    <div className="text-red-500 text-sm">{errors[name]}</div>
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                                isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isSubmitting || !isValid}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AdminLocationForm;
