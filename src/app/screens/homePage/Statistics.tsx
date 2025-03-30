import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";
import  useNavigate  from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";

export default function Statistics() {
  const location = useLocation();

  const [productSearch, setProductSearch] = useState({
    page: 1,
    limit: 6,
    order: "createdAt", // Default sort
    productCollection: ProductCollection.FRUIT,
    search: "",
  });
  



  // Update the productCollection state based on the URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") as ProductCollection;
  
    if (category && Object.values(ProductCollection).includes(category)) {
      setProductSearch((prevState) => ({
        ...prevState,
        productCollection: category,
      }));
    } else {
      setProductSearch((prevState) => ({
        ...prevState,
        productCollection: ProductCollection.FRUIT, // Default qiymat
      }));
    }
  }, [location.search]); // Faqat location.search o'zgarganida ishga tushadi

  const history = useHistory();  // useHistory hook'ini chaqirish

  // Kategoriyani tanlash va manzilga o'tish
  const handleCategoryClick = (other: string) => {
    history.push(`/products?category=${other}&sort=createdAt`);  // Push bilan navigatsiya
  };

  return (
    <div className={"static-frame"}>
        {/* <Stack className="static-foto">
          <img src="/img/statistcs.jpeg"/>
        </Stack> */}
        <Stack className={"info"}>
         <img className="foto" src="/img/statistcs.jpeg"/>
         <Stack className={"static-box"}>
            <Stack className="static-user">
            <Box className="static-img">
              <img src="/img/user.png" alt="User Icon" />
            </Box>
            <Box className="static-content">
              <Box className={"static-num"}>30K+</Box>
              <Box className={"static-text"}>User Order</Box>
            </Box>
            </Stack>

            <Stack className="static-product">
            <Box className="static-img">
              <img src="/img/products.png" alt="Product Icon" />
            </Box>
            <Box className="static-content">
              <Box className={"static-num"}>110+</Box>
              <Box className={"static-text"}>Products</Box>
            </Box>
            </Stack>

            <Stack className="static-sale">
            <Box className="static-img">
              <img src="/img/management.png" alt="Sales Icon" />
            </Box>
            <Box className="static-content">
              <Box className={"static-num"}>500K+</Box>
              <Box className={"static-text"}>Monthly Sales</Box>
            </Box>
            </Stack>

            <Stack className="static-customer">
            <Box className="static-img">
              <img src="/img/happy-face.png" alt="Happy Customer Icon" />
            </Box>
            <Box className="static-content">
              <Box className={"static-num"}>98%</Box>
              <Box className={"static-text"}>Happy Customers</Box>
            </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack
            className={"shop-category-section"}
          >
            <Box className={"category-title"}>Shop By Category</Box>
            <div className="shop-category-container">

               {/* Fresh-Fruits category */}
               <Button
                onClick={() => handleCategoryClick(ProductCollection.FRUIT)}
                startIcon={<img src="/img/fruits.png" alt="Fruit" />}
                className="title-button"
              >
              Fruits
              </Button>

              {/* Dessert category */}
              <Button
                onClick={() => handleCategoryClick(ProductCollection.DESSERT)}
                startIcon={<img src="/img/ice-cream.jpg" alt="Dessert" />}
                className="title-button"
              >
                Desserts
              </Button>

              {/* Drink category */}
              <Button
                onClick={() => handleCategoryClick(ProductCollection.CANNED)}
                startIcon={<img src="/img/canned.jpg" alt="Drink" />}
                className="title-button"
              >
                Canned Foods
              </Button>

              {/* Fresh-Vegetables category */}
              <Button
                onClick={() => handleCategoryClick(ProductCollection.VEGETABLE)}
                startIcon={<img src="/img/vegetables.jpg" alt="Vegetable"  />}
                className="title-button"
              >
                Vegetables
              </Button>

              {/* Other category */}
              <Button
                onClick={() => handleCategoryClick("OTHER")}
                startIcon={<img src="/img/others.png" alt="Other"/>}
                className="title-button"
              >
                Other
              </Button>
            </div>
        </Stack>
    </div>
  );
}

