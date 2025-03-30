import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import Basket from "./Basket";
import React, { useEffect, useRef, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout, Rotate90DegreesCcw, RotateRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Swiper CSS
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Route, Switch, NavLink, Link } from 'react-router-dom'; // To'g'ri import
import { transform } from "typescript";









interface HomeNavbarProps {
  cartItems: any[];
  onAdd: (item: any) => void;
  onRemove: (item: any) => void;
  onDelete: (item: any) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    setSignupOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Elementga scroll qilish, ammo navbarni hisobga olib
      const offset = -100; // navbarning balandligi, bu qiymatni sozlang
      const elementPosition = scrollRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Muloyim skroll
      });
    }
  }, []); 
  // ref={scrollRef}

  const slides = [
    {
      title: "The Finest Fruits & Freshest Vegetables from Around the World",
      subtitle: "Your Ultimate Destination for Nature's Best",
      service: "Available 24/7, Always at Your Service",
      image: "/img/savat-rasm.jpg",
    },
    {
      title: "Premium Quality Fruits & Vegetables Delivered Fresh to Your Doorstep",
      subtitle: "Bringing the Garden's Freshness to Your Table",
      service: "Available 24/7, Always at Your Service",
      image: "/img/deliver3.jpeg",
    },
    {
      title: "Freshness You Can Trust, Every Single Day Straight from the Fields",
      subtitle: "Your Go-To Source for Healthy Living",
      service: "Available 24/7, Always at Your Service",
      image: "/img/healthy-food.png",
    },
  ];


  const { authMember } = useGlobals(); // Assuming `useGlobals` is imported

  return (
    <div className="home-navbar" ref={scrollRef}>
      <div className="navbar-container">
        <div className="aka" >
        <Stack className="menu">
          <Box>
            <NavLink to={"/"} activeClassName="underline">
              <img src="/icons/Farm-Fresh logo.jpg" className="brand-logo" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to={"/"} activeClassName="underline">Home</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to={"/products"} activeClassName="underline">Products</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to={"/help"} activeClassName="underline">Help</NavLink>
            </Box>
            {authMember && (
              <>
                <Box className={"hover-line"}>
                  <NavLink to={"/orders"} activeClassName="underline">Orders</NavLink>
                </Box>
                <Box className={"hover-line"}>
                  <NavLink to={"/member-page"} activeClassName="underline">MyPage</NavLink>
                </Box>
              </>
            )}
            {/* Basket */}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {/* Sign Up and Login */}
            {!authMember && (
              <Box className="signup">
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              </Box>
            )}
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={authMember?.memberImage ? `${serverApi}/${authMember?.memberImage}` : "/icons/default-user.svg"}
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}
            {/* Menu for Logout */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        </div>

        {/* Swiper Section for Text with Autoplay */}
        {/* <Stack className={"header-frame"}> */}
        <Stack className={"detail"}>
          <Swiper
              slidesPerView={1} // Display one slide at a time
              spaceBetween={10}
              loop={true} // Infinite loop
              autoplay={{
                delay: 4000, // 4 seconds delay before auto-sliding
                disableOnInteraction: true, // Continue autoplay after interaction
              }}
              // modules={[Autoplay, Navigation, Pagination]}
              pagination={{ clickable: true }}
              className="navbar-swiper"
            >
              {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Stack direction="row" alignItems="center" spacing={4}>
                  <Box>
                    <Box className="head-main-txt">{slide.title}</Box>
                    <Box className="wel-txt">{slide.subtitle}</Box>
                    <Box className="service-txt">{slide.service}</Box>
                  </Box>
                  <Box className="logo-img">
                    <img src={slide.image} alt="Fruits and Vegetables" className="swiper-image" />
                  </Box>
                </Stack>
                <Link to="/products" className="shop-button">
                  <Button variant="contained">SHOP NOW</Button>
                </Link>
                <img src="/icons/arrow-right.svg" alt="Arrow" className="arrow-icon" />
              </SwiperSlide>
            ))}

          </Swiper>
        </Stack>
        {/* </Stack> */}
      </div>
    </div>
  );
}
