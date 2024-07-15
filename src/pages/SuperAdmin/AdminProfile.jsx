import React, { useState } from 'react';
import './AdminProfile.css';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        name: 'SuperAdmin Name',
        email: 'superadmin@mail.com',
        username: 'superadminUsername',
        phoneNumber: '123-456-7890',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        // Add save functionality here, e.g., API call to save the profile details
    };

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/logout'); // Redirect to the Logout component
    };

    return (
        <div className="main-container">
            <div className="content">
                <Header />
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img
                                    className="rounded-circle mt-5"
                                    width="150px"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    alt="Profile"
                                />
                                <span className="font-weight-bold">{profile.name}</span>
                                <span className="text-black-50">{profile.email}</span>
                                <span> </span>
                                <button className="btn btn-danger mt-3" onClick={handleLogoutClick}>Logout</button>
                            </div>
                        </div>
                        <div className="col-md-9 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Client Profile Settings</h4>
                                    <button className="btn btn-secondary" onClick={handleEditClick}>
                                        {editMode ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>
                                {editMode ? (
                                    <div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Name</label>
                                                <input type="text" className="form-control" name="name" placeholder="Name" value={profile.name} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Email</label>
                                                <input type="email" className="form-control" name="email" placeholder="Email" value={profile.email} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label className="labels">Username</label>
                                                <input type="text" className="form-control" name="username" placeholder="Username" value={profile.username} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label className="labels">Phone Number</label>
                                                <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={profile.phoneNumber} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="mt-5 text-center">
                                            <button className="btn btn-primary profile-button" onClick={handleSaveClick}>Save Profile</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Name</label>
                                                <p>{profile.name}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Email</label>
                                                <p>{profile.email}</p>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label className="labels">Username</label>
                                                <p>{profile.username}</p>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <label className="labels">Phone Number</label>
                                                <p>{profile.phoneNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
