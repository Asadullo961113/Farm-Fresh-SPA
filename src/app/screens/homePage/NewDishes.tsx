import React from "react";
import { Container, Box, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setFreshArrivals } from "./slice";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { log } from "console";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR  **/

const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({ 
    newDishes 
  }));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  console.log("Sale Products: ", newDishes);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
            <Box className={"category-title"} 
                 style={{ borderBottom: "2px solid #0ab237", 
                 paddingBottom: "5px" }}>
                Sale Products
            </Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`
                const sizeVolume = 
                product.productCollection === ProductCollection.CANNED ? product.productVolume + " litter": product.productSize + " SIZE";
                  return (
                    <Card key={product._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>
                        <Typography className="discount">
                          {Math.round(((2 / (product.productPrice + 2)) * 100))}% Off
                        </Typography>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className={"info"}>
                          <Stack flexDirection={"row"} spacing={1}> 
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#322d24" />
                            
                            <div className="prices">
                              <Typography className={"oldPrice"}>
                                ${product.productPrice + 2}
                              </Typography>
                              <Typography className={"newPrice"}>
                                ${product.productPrice}
                              </Typography>
                            </div>
                          </Stack>
                        <Stack>
                            <Typography className={"views"}>
                            {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 25, marginLeft: "5px",color: "#333"}}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className={"no-data"}>New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}