import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";
import ImageUpload from "../Components/ImageUpload";
import UploadToGallery from "../Components/UploadToGallery";

const UserProfilePage = () => {
  const [userType, setUserType] = useState();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    stageName: "",
    career: "",
    genre: "",
    birthday: "",
    music: "",
    email: "",
    about: "",
    image: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    organizationName : "",
    address: "",
    contactNo : "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const { user } = useStateContext();

  useEffect(() => {
    if (user) {
      setUserType(user.userType);
    }
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user && user._id && user.userType === "Artist") {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist/${user._id}`
          );
          if (response.data) {
            console.log(response.data);
            setProfile(response.data);
          } else {
            console.warn("Profile not found");
          }
        } else if (user && user._id && user.userType === "User") {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/user/${user._id}`
          );
          if (response.data) {
            console.log(response.data);
            setProfile(response.data);
          } 
          
          else {
            console.warn("Profile not found");
          }
        }
        else if (user && user._id && user.userType === "Organization") {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/org/${user._id}`
          );
          if (response.data) {
            console.log(response.data);
            setProfile(response.data);
          } 
          
          else {
            console.warn("Profile not found");
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveArtistProfile = async () => {
    try {
      console.log("Updated Profile:", profile);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`,
        profile
      );
      console.log("Response:", response);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const saveUserProfile = async () => {
    try {
      console.log("Updated Profile:", profile);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`,
        profile
      );
      console.log("Response:", response);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const saveOrganizationProfile = async () => {
    try {
      console.log("Updated Profile:", profile);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/org`,
        profile
      );
      console.log("Response:", response);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div className="text-black poppins px-[12%] py-10">
      {userType === "Artist" && (
        <div className="container container-below-header">
          <div className="profile-section">
            <h2>Artist Profile</h2>
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-pic flex flex-col items-center justify-center">
                  <div className="">
                    <ImageUpload
                      id={user._id}
                      currentImg={profile.image}
                      userType={user.userType}
                    />
                  </div>
                </div>

                <div className="profile-name">{user.username}</div>
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
                  value={profile.stageName}
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
                  value={profile.career}
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
                  value={profile.genre}
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
                  value={profile.birthday}
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
                  value={profile.music}
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

              {isEditMode ? (
                <button id="saveProfileBtn" onClick={saveArtistProfile}>
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

      {userType === "User" && (
        <div className="container container-below-header">
          <div className="profile-section">
            <h2>User Profile</h2>
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-pic flex flex-col items-center justify-center">
                  <div className="">
                    <ImageUpload id={user._id} currentImg={profile.image} />
                  </div>
                </div>

                <div className="profile-name">{user.username}</div>
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
              {isEditMode ? (
                <button id="saveProfileBtn" onClick={saveUserProfile}>
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

      {userType === "Organization" && (
        <div className="container container-below-header">
          <div className="profile-section">
            <h2>Organization Profile</h2>
            <div className="profile-info">
              <div className="profile-container">
                <div className="profile-pic flex flex-col items-center justify-center">
                  <div className="">
                    <ImageUpload id={user._id} currentImg={profile.image} />
                  </div>
                </div>

                <div className="profile-name">{user.username}</div>
              </div>
              <div className="info-row">
                <label htmlFor="firstName">Organization Name</label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={profile.organizationName}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="lastName">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profile.address}
                  readOnly={!isEditMode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-row">
                <label htmlFor="">Contact Number</label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={profile.contactNo}
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
              {isEditMode ? (
                <button id="saveProfileBtn" onClick={saveOrganizationProfile}>
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

      {userType === "Artist" ? <UploadToGallery /> : ""}
    </div>
  );
};

export default UserProfilePage;
