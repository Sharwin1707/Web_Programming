import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider";
import { useToast } from "../Components/Toast";

const RegisterPage = () => {
  const { token, setUser, setToken, setIsGuest } = useStateContext();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");

  const { showToastMessage } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/users/register`,
        { email, username, password, userType }
      );

      const { user } = response.data;
      setUser(user);
      setToken(user._id);
      setIsGuest(false);
      console.log(userType);
      
      if (userType === 'Artist') {
        await createArtistProfile(user);
        showToastMessage('Please complete your profile');
        navigate('/profile'); // Adjust the path to your profile management page
      } else if (userType === 'User') {
        await createUserProfile(user);
        showToastMessage('Please complete your profile');
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      showToastMessage('Registration failed. Please try again.');
    }
  };

  const createArtistProfile = async (user) => {
    const artistProfile = {
      _id: user._id,
      image: ' ',
      firstName: ' ',
      lastName: ' ',
      stageName: ' ',
      career: ' ',
      genre: ' ',
      birthday: ' ',
      music: ' ',
      email: user.email,
      about: ' ',
    };
    await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`, artistProfile);
  };

  const createUserProfile = async (user) => {
    const userProfile = {
      _id: user._id,
      image: ' ',
      username : username,
      firstName: ' ',
      lastName: ' ',
      email: user.email,
    };
    await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/profile/user`, userProfile).then((response) => {console.log(response)});
  };


  return (
    <section>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <div className="signin">
        <div className="content">
          <h2>Sign Up</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i>Email</i>
            </div>

            <div className="inputBox">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i>Username</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i>Confirm Password</i>
            </div>

            <div>
              <select
                name="userType"
                id="userType"
                className="w-full p-2 bg-[#333] text-white rounded-md"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="User">User</option>
                <option value="Artist">Artist</option>
                <option value="Organization">Organization</option>
              </select>
            </div>

            <div className="links">
              <a href="#">Forgot Password</a>
              <Link to={"/guest/login"}>Login</Link>
            </div>

            <div className="inputBox">
              <input type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
