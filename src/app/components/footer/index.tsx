import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: linear-gradient(to right, #4CAF50, #8BC34A, #8BC34A,#8BC34A, #4CAF50);
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "60px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
          <Box>
            <img 
              width={"100px"} 
              src={"/icons/Farm-Fresh logo.jpg"} 
              style={{ borderRadius: '5px' }} 
            />
          </Box>

            <Box className={"foot-desc-txt"}>
            Our online store offers a wide variety of farm-fresh fruits and vegetables, 
            sourced directly from local farms. We aim to bring the highest quality produce to your doorstep, 
            ensuring every bite is as fresh as if you picked it yourself. With a focus on health and sustainability, 
            we provide a seamless shopping experience for those who appreciate natural, healthy, and delicious foods.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px",mt: "70px" }} flexDirection={"row"}>
            <Stack>
              <Box sx={{ ml: "148px" }}>
                <Box className={"foot-category-title"}>Sections</Box>
                <Box className={"foot-category-link"}>
                  <Box className="link-box">
                    <Link to="/">Home</Link>
                  </Box>
                  <Box className="link-box">
                    <Link to="/products">Products</Link>
                  </Box>
                  {authMember && (
                    <Box className="link-box">
                      <Link to="/orders">Orders</Link>
                    </Box>
                  )}
                  <Box className="link-box">
                    <Link to="/help">Help</Link>
                  </Box>
                  </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "200px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>60-49 Road 11378 New York</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+65 554 757588</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>FarmFresh@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid rgb(3, 3, 3)", width: "100%", opacity: "0.2" }}
          sx={{ mt: "40px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Farm Fresh Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
