import React, { useState } from 'react';

const UserProfilePage = () => {
  const initialProfile = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    gender: 'male',
    email: 'john@example.com',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    currentPassword: '',
    newPassword: ''
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('weak');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    if (name === 'newPassword') {
      // Calculate password strength when new password changes
      const newStrength = calculatePasswordStrength(value);
      setPasswordStrength(newStrength);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const saveProfile = () => {
    // Here you can perform save logic (e.g., send updated profile to server)
    // For demonstration, we're just logging the updated profile
    console.log('Updated Profile:', profile);
    setIsEditMode(false); // Exit edit mode after saving
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) {
      return 'weak';
    } else if (password.length < 10) {
      return 'medium';
    } else {
      return 'strong';
    }
  };



  return (
    <div className='text-black poppins py-10'>
      <div className="container container-below-header">
        <div className="profile-section">
          <h2>Profile Settings</h2>
          <div className="profile-info">
            <div className="profile-container">
              <div className="profile-pic flex justify-center">
                <img src="../melanie.jpg" alt="Profile Picture" id="profilePic" />
              </div>
              <div className="profile-name">{profile.firstName} {profile.lastName}</div>
            </div>
            <div className="info-row">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profile.firstName}
                readOnly={!isEditMode}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-row">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profile.lastName}
                readOnly={!isEditMode}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-row">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={profile.phoneNumber}
                readOnly={!isEditMode}
                onChange={handleInputChange}
              />
            </div>
           
            <div className="info-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                readOnly={!isEditMode}
                onChange={handleInputChange}
              />
            </div>
            

            <div className="password-section">
              <h3>Change Password</h3>
              <label htmlFor="current_password">Current Password:</label>
              <input
                type="password"
                id="current_password"
                name="currentPassword"
                value={profile.currentPassword}
                readOnly={!isEditMode}
                onChange={handleInputChange}
              />

              <label htmlFor="new_password">New Password:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="new_password"
                  name="newPassword"
                  value={profile.newPassword}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </span>
              </div>

              <div className="password-strength">
                <div className="password-strength-indicator">
                    <div className={`password-strength-indicator-bar ${passwordStrength}`}></div>
                </div>
              </div>
            </div>

            {isEditMode ? (
              <button id="saveProfileBtn" onClick={saveProfile}>Save Profile</button>
            ) : (
              <button id="editProfileBtn" onClick={toggleEditMode}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
