import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context/ContextProvider";

const UserProfilePage = () => {
  const {user} = useStateContext()
  const [userType ,setUserType] = useState()

  useEffect(() => {
    setUserType(user.userType)
  },[])

  const initialProfile = {
    image:
      "https://www.sinarharian.com.my/uploads/images/2019/04/18/275597.jpg",
    firstName: "Ismail",
    lastName: "Izzani",
    stageName: "Ismail Izzani",
    career: "Malaysian Singer",
    genre: " Pop and R&B",
    birthday: "April 13th, 2000 (24 years old)",
    music: "Sabar, Demi Kita, Bidadari and more.",
    phoneNumber: "1234567890",
    email: "mail@example.com",
    about:
      "I am a Malaysian singer, songwriter and maleactor. I was a champion in a competition onYouTube and the son of a veteran singer ofthe 1980s, Suliza Salam.",
    currentPassword: "",
    newPassword: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    if (name === "newPassword") {
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
    console.log("Updated Profile:", profile);
    setIsEditMode(false);
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) {
      return "weak";
    } else if (password.length < 10) {
      return "medium";
    } else {
      return "strong";
    }
  };

  return (
    <div className="text-black poppins px-[12%] py-10">
      {userType == "User" || userType == "Organization" ? (
        <div className="container container-below-header">
          <div className="profile-section">
            <h2>Profile Settings</h2>
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-pic flex justify-center">
                  <img
                    src="../melanie.jpg"
                    alt="Profile Picture"
                    id="profilePic"
                  />
                </div>
                <div className="profile-name">{profile.stageName}</div>
              </div>
              {userType == "User" ? (
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
              ) : (
                ""
              )}
              {userType == "User" ? (
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
              ) : (
                ""
              )}

              {userType == "Organization" ? (
                <div className="info-row">
                  <label htmlFor="lastName">Organization Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                ""
              )}

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
                  className="border border-gray-400 rounded-md"
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
                    className="border border-gray-400 rounded-md"
                    type={showPassword ? "text" : "password"}
                    id="new_password"
                    name="newPassword"
                    value={profile.newPassword}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </span>
                </div>

                <div className="password-strength">
                  <div className="password-strength-indicator">
                    <div
                      className={`password-strength-indicator-bar ${passwordStrength}`}
                    ></div>
                  </div>
                </div>
              </div>

              {isEditMode ? (
                <button id="saveProfileBtn" onClick={saveProfile}>
                  Save Profile
                </button>
              ) : (
                <button id="editProfileBtn" onClick={toggleEditMode}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {userType === "Artist" && (
        <div className="container container-below-header">
          <div className="profile-section">
            <h2>Artist Profile</h2>
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-pic flex justify-center">
                  <img
                    className="w-full h-full object-cover border border-gray-400"
                    src={profile.image}
                    alt="Profile Picture"
                    id="profilePic"
                  />
                </div>
                <div className="profile-name">{profile.stageName}</div>
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
                <label htmlFor="stageName">Stage Name</label>
                <input
                  type="text"
                  id="stageName"
                  name="stageName"
                  value={profile.stageName || ""}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="career">Career</label>
                <input
                  type="text"
                  id="career"
                  name="career"
                  value={profile.career || ""}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="genre">Genre</label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={profile.genre || ""}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="text"
                  id="birthday"
                  name="birthday"
                  value={profile.birthday || ""}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="music">Music</label>
                <input
                  type="text"
                  id="music"
                  name="music"
                  value={profile.music || ""}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={profile.about}
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
                  className="border border-gray-400 rounded-md"
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
                    className="border border-gray-400 rounded-md"
                    type={showPassword ? "text" : "password"}
                    id="new_password"
                    name="newPassword"
                    value={profile.newPassword}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </span>
                </div>
                <div className="password-strength">
                  <div className="password-strength-indicator">
                    <div
                      className={`password-strength-indicator-bar ${passwordStrength}`}
                    ></div>
                  </div>
                </div>
              </div>
              {isEditMode ? (
                <button id="saveProfileBtn" onClick={saveProfile}>
                  Save Profile
                </button>
              ) : (
                <button id="editProfileBtn" onClick={toggleEditMode}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
