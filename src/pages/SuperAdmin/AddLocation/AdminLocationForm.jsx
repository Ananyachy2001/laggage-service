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
    regularPrice: Yup.number().required('Required').typeError('Must be a number'),
    discountPercentage: Yup.number().required('Required').typeError('Must be a number'),
    availableFrom: Yup.date().required('Required'),
    availableTo: Yup.date().required('Required'),
    notes: Yup.string().required('Required'),
    pictures: Yup.string().required('Required'),
    openTime: Yup.string().required('Required'),
    closeTime: Yup.string().required('Required'),
    locationType: Yup.string().required('Required'),
    timezone: Yup.string().required('Required')
});

const AdminLocationForm = ({ onSubmit, location }) => {
    return (
        <Formik
            initialValues={{
                name: location?.additionalDetails?.name || '',
                description: location?.additionalDetails?.formattedAddress || '',
                street: location?.address?.street || '',
                district: location?.address?.district || '',
                city: location?.address?.city || '',
                state: location?.address?.state || '',
                zipCode: location?.address?.zipCode || '',
                country: location?.address?.country || '',
                regularPrice: location?.regularPrice || '',
                discountPercentage: location?.discountPercentage || '',
                availableFrom: location?.availableFrom || '',
                availableTo: location?.availableTo || '',
                notes: location?.notes || '',
                pictures: location?.pictures ? location.pictures.join(', ') : '',
                openTime: location?.openTime || '',
                closeTime: location?.closeTime || '',
                locationType: location?.locationType || '',
                timezone: location?.timezone || ''
            }}
            validationSchema={locationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue, isValid, isSubmitting }) => {
                useEffect(() => {
                    if (location.address) {
                        setFieldValue('street', location.address.street);
                        setFieldValue('district', location.address.district);
                        setFieldValue('city', location.address.city);
                        setFieldValue('state', location.address.state);
                        setFieldValue('zipCode', location.address.zipCode);
                        setFieldValue('country', location.address.country);
                    }
                    if (location.additionalDetails) {
                        setFieldValue('name', location.additionalDetails.name);
                        setFieldValue('description', location.additionalDetails.formattedAddress);
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
                                { name: 'regularPrice', label: 'Regular Price' },
                                { name: 'discountPercentage', label: 'Discount Percentage' },
                                { name: 'availableFrom', label: 'Available From', type: 'date' },
                                { name: 'availableTo', label: 'Available To', type: 'date' },
                                { name: 'notes', label: 'Notes' },
                                { name: 'pictures', label: 'Pictures (URLs, comma separated)' },
                                { name: 'openTime', label: 'Open Time', type: 'time' },
                                { name: 'closeTime', label: 'Close Time', type: 'time' },
                                { name: 'locationType', label: 'Location Type' },
                                { name: 'timezone', label: 'Timezone' }
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

export default AdminLocationForm;
