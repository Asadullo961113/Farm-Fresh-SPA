import React, { useState } from 'react';
import {Link, Route, Routes, useLocation } from 'react-router-dom';
// import { RippleBadge } from './MaterialTheme/styled';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import  About  from './screens/userPage';
import  Users  from './screens/userPage';
import HomePage from './screens/homePage';
import {ProductsPage} from './screens/productsPage';
import { HomeNavbar } from './components/headers/HomeNavbar';
import  {OtherNavbar } from './components/headers/OtherNavbar';
import '../css/app.css';
import '../css/navbar.css'
import '../css/product.css'
import '../css/footer.css'
import Footer from './components/footer';
import OrdersPage from './screens/ordersPage';
import UserPage from './screens/userPage';
import HelpPage from './screens/helpPage';
import {CartItem}  from '../lib/types/search';
import useBasket from './hooks/useBasket';
// import AuthenticationModal from './components/auth';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../lib/sweetAlert';
import { Messages } from '../lib/config';
import MemberService from './services/MemberService';
import  {useGlobals}  from './hooks/useGlobals';
import AuthenticationModal from './components/auth';

function App() {
  const location  = useLocation()
  const {setAuthMember} = useGlobals()
  const {
    cartItems, 
    onAdd, 
    onRemove,
    onDelete,
    onDeleteAll,} = useBasket()
  const [signupOpen, setSignupOpen] = useState<boolean>(false)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorElement] = useState<HTMLElement | null >(null)

  /** HANDLERS **/
  const handleSignupClose = () => setSignupOpen(false)
  const handleLoginClose = () => setLoginOpen(false)
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(e.currentTarget)
  }
  const handleCloseLogout = () => setAnchorElement(null)
  const handleLogoutRequest = async () => {
    try{
      const member = new MemberService()
      await member.logout()
      await sweetTopSuccessAlert("success", 700)
      setAuthMember(null)
    }
    catch (err) {
      console.log("errors", err);
      sweetErrorHandling(Messages.error1)      
    }
  }
  return (
    <>
      {location.pathname === '/' 
        ? <HomeNavbar 
            cartItems = {cartItems} 
            onAdd = {onAdd}
            onRemove = {onRemove} 
            onDelete = {onDelete} 
            onDeleteAll = {onDeleteAll}
            setSignupOpen ={setSignupOpen}
            setLoginOpen = {setLoginOpen}
            anchorEl = {anchorEl} 
            handleLogoutClick = {handleLogoutClick}
            handleCloseLogout = {handleCloseLogout}
            handleLogoutRequest = {handleLogoutRequest}
             /> 
        : <OtherNavbar
            cartItems = {cartItems} 
            onAdd = {onAdd}
            onRemove = {onRemove} 
            onDelete = {onDelete} 
            onDeleteAll = {onDeleteAll}
            setSignupOpen ={setSignupOpen}
            setLoginOpen = {setLoginOpen}
            anchorEl = {anchorEl} 
            handleLogoutClick = {handleLogoutClick}
            handleCloseLogout = {handleCloseLogout}
            handleLogoutRequest = {handleLogoutRequest}
            /> 
        }
    <Routes>
      <Route path="/products" element={<ProductsPage onAdd={onAdd} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/member-page" element={<UserPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
      <Footer/>
      <AuthenticationModal 
        signupOpen={signupOpen} 
        loginOpen={loginOpen} 
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}



export default App;
