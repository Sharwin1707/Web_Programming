import './App.css'
import {Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import BookingPage from '../Pages/BookingPage'
import BookingDetail from '../Pages/BookingDetail'
import ShopPage from '../Pages/ShopPage'
import PendingRequestPage from '../Pages/PendingRequestPage'
import ProductDetailPage from '../Pages/ProductDetailPage'
import ArtistManagement from '../Pages/ArtistManagement'
import LoginPage from '../Pages/LoginPage'
import ArtistPage from '../Pages/ArtistPage'
import ArtistProfilePage from '../Pages/ArtistProfilePage'
import EventPage from '../Pages/EventPage'
import PaymentPage from '../Pages/PaymentPage'
import ShoppingCartPage from '../Pages/ShoppingCartPage'
import RegisterPage from '../Pages/RegisterPage'

import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import NavBar from '../Components/NavBar'
import CreateEventPage from '../Pages/CreateEventPage'
import UserProfilePage from '../Pages/UserProfilePage'
import PurchaseHistoryPage from '../Pages/PurchaseHistoryPage'
import EventManagementPage from '../Pages/EventManagementPage'

function App() {


  const [user, setUserType] = useState('');
  const [userName, setUserName] = useState('');

  const location = useLocation();
  const { userType, username } = location.state || '';

  useEffect(() => {
    if (userType) {
      setUserType(userType);
    }
    if (username) {
      setUserName(username);
    }
  }, [userType, username]);

  const logout = () => {
    setUserType('');
    setUserName('');
  };

  console.log(user)
  console.log(userName)


  return (
    <div>
      <NavBar userType={user} userName={userName} onLogout={logout}/>
      <main className='flex-1 min-h-[79vh]'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/artist' element={<ArtistPage/>} />
          <Route path='/artistprofile/:id' element={<ArtistProfilePage/>} />
          <Route path='/book/' element={<BookingPage/>} />
          <Route path='/book/:id' element={<BookingDetail/>}/>
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/event' element={<EventPage userType={user}/>} />
          <Route path='/event/manage' element={<EventManagementPage/>} />
          <Route path='/shop/:id' element={<ProductDetailPage/>} />
          <Route path='/request' element={<PendingRequestPage/>} />
          <Route path='/manage' element={<ArtistManagement/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/payment' element={<PaymentPage/>} />
          <Route path='/cart' element={<ShoppingCartPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/event/create' element={<CreateEventPage/>} />
          <Route path='/profile' element={<UserProfilePage/>} />
          <Route path='/purchasehistory' element={<PurchaseHistoryPage/>} />
      </Routes>
      </main>  
    </div>
  )
}

export default App
