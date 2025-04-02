import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import  {useGlobals}  from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { useEffect, useRef } from "react";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void
  setLoginOpen: (isOpen: boolean) => void
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void
  anchorEl: HTMLElement | null
  handleCloseLogout: () => void
  handleLogoutRequest: () => void
}

export function OtherNavbar(props: OtherNavbarProps) {
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
  const {authMember} = useGlobals();

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


  return (
    <div className="other-navbar" ref={scrollRef}>
      <Container className="navbar-container">
        <Stack className="menu">
        <Box>
          <NavLink to={"/"} className={({ isActive }) => (isActive ? "underline" : "")}>
            <img src="/icons/Farm-Fresh logo.jpg" className="brand-logo" />
          </NavLink>
        </Box>
        <Stack className="links">
          <Box className={"hover-line"}>
            <NavLink to={"/"} className={({ isActive }) => (isActive ? "underline" : "")}>
              Home
            </NavLink>
          </Box>
          <Box className={"hover-line"}>
            <NavLink to={"/products"} className={({ isActive }) => (isActive ? "underline" : "")}>
              Products
            </NavLink>
          </Box>
          <Box className={"hover-line"}>
            <NavLink to={"/help"} className={({ isActive }) => (isActive ? "underline" : "")}>
              Help
            </NavLink>
          </Box>

            <Box>
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/orders" className={({ isActive }) => (isActive ? "underline" : "")}>
                    Orders
                  </NavLink>

                </Box>
              ) : null}
            </Box>
            <Box>
              {authMember ? (
                <Box className={"hover-line"}>
                  {" "}
                  <NavLink to="/member-page" className={({ isActive }) => (isActive ? "underline" : "")}>
                    MyPage
                  </NavLink>

                </Box>
              ) : null}
            </Box>
            {/* Basket */}
            <Basket 
                cartItems={cartItems}
                onAdd ={onAdd}
                onRemove ={onRemove}
                onDelete ={onDelete}
                onDeleteAll ={onDeleteAll} />
            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button" 
                        onClick={() => setLoginOpen(true)} 
                        style={{backgroundColor:"#2ead49",color:"#ffffff",fontWeight:"bold"}}>
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open = {Boolean(anchorEl) ? true : false}
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
      </Container>
    </div>
  );
}