import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack, Collapse, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, useLocation } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { retrieveProducts } from "./selector";
import { useCategory } from "../../context/CategoryContext";

interface ProductsProps {
  onAdd: (item: CartItem) => void
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 12,
    order: "createdAt",
    productCollection: ProductCollection.FRUIT,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");


  const navigate = useNavigate();
  const location = useLocation();


  const { selectedCategory, setSelectedCategory } = useCategory();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory); // Contextni yangilash
    // URLni yangilash
    navigate(`/products?category=${newCategory}&sort=${productSearch.order}`);
  };
  
  

  useEffect(() => {
    if (selectedCategory) {
      setProductSearch((prev) => ({
        ...prev,
        productCollection: selectedCategory as ProductCollection,
      }));
    }
  }, [selectedCategory]);
  

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") as ProductCollection;
    if (category && Object.values(ProductCollection).includes(category)) {
      setSelectedCategory(category); // selectedCategory ni yangilash
    }
  }, [location.search]);
  

  // Fetch products based on productSearch state
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.log("No products found or invalid data format");
          setProducts([]); // Bo'sh array qilib o'rnatish
        }
      })
      .catch((err) => {
        console.log("Error fetching products", err);
        setProducts([]); // Xato bo'lsa ham bo'sh array qilib o'rnatish
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* HANDLER SECTION */
  const searchCollectionHandler = (collection: ProductCollection) => {
    // `category`ni yangilash
    setProductSearch((prev) => ({
      ...prev,
      productCollection: collection,
      page: 1, // Sahifani boshidan boshlash
    }));
    
    // URLni yangilash
    navigate(`/products?category=${collection}&sort=${productSearch.order}`);
  };

  
  useEffect(() => {
    // location ob'ektini window orqali ishlating
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") as ProductCollection;
    const sort = searchParams.get("sort");
  
    if (category && Object.values(ProductCollection).includes(category)) {
      setSelectedCategory(category); // selectedCategory ni yangilash
      setProductSearch((prev) => ({
        ...prev,
        productCollection: category,
        order: sort || prev.order, // Sort parametrini ham olish
        page: 1, // Sahifani boshidan boshlash
      }));
    }
  }, [location.search]);
  

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    navigate(`/products/${id}`);
  };
  
  

  return (<>
    <div className="products">
      <Container>
          <Stack direction="column" alignItems="center">
          <Stack>
          <Box position="relative" width={{ xs: '90%', md: '600px' }}>
            <input
              type="search"
              className="single-search-input"
              name="singleResearch"
              placeholder="Type here"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') searchProductHandler();
              }}
            />
            <Button
              className="search-button"
              onClick={searchProductHandler}
            >
              <SearchIcon style={{ fontSize: 40, position: 'absolute' }} />
            </Button>
          </Box>
        </Stack>

  
          {/* Combined Sort and Category Container */}
          <Stack direction="column" spacing={2} className="sort-category-container">
  
            {/* Category Container */}
            <Stack direction="column" className="category-container">
              <Button 
              >
                Category
              </Button>
  
                <Stack className={"list-category-section"}>
                  <FormControl component="fieldset" className="category-radio">
                    <RadioGroup
                      className="radio"
                      value={productSearch.productCollection}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value={ProductCollection.FRUIT}
                        control={<Radio />}
                        label="Fresh-Fruits"
                        // color={productSearch.productCollection === ProductCollection.FRUIT ? "primary" : "secondary"}
                      />

                      <FormControlLabel
                        value={ProductCollection.VEGETABLE}
                        control={<Radio />}
                        label="Fresh-Vegetables"
                        // color={productSearch.productCollection === ProductCollection.VEGETABLE ? "primary" : "secondary"}
                      />
                      
                      <FormControlLabel
                        value={ProductCollection.CANNED}
                        control={<Radio />}
                        label="Canned Foods"
                        // color={productSearch.productCollection === ProductCollection.CANNED ? "primary" : "secondary"}
                      />

                      <FormControlLabel
                        value={ProductCollection.DESSERT}
                        control={<Radio />}
                        label="Dessert"
                        // color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
                      />
                      

                      <FormControlLabel
                        value={ProductCollection.OTHERS}
                        control={<Radio />}
                        label="Other"
                        // color={productSearch.productCollection === ProductCollection.OTHERS ? "primary" : "secondary"}
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>

              </Stack>

            {/* Sort Container */}
              <Stack className="sort-container">
               <Button
                variant="contained"
                style={{backgroundColor:"#3dd12f"}}
               >
                Sort
               </Button>
  
               <Stack className={"items-filter-section"}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      className="radio"
                      value={productSearch.order}
                      onChange={(e) => searchOrderHandler(e.target.value)}
                    >
                      <FormControlLabel
                        value="createdAt"
                        control={<Radio />}
                        label="New"
                      />
                      <FormControlLabel
                        value="productPrice"
                        control={<Radio />}
                        label="Price"
                      />
                      <FormControlLabel
                        value="productViews"
                        control={<Radio />}
                        label="Views"
                      />
                    </RadioGroup>
                  </FormControl>
              </Stack>
            </Stack>
          </Stack>
  
          {/* Product List */}
          
          <Stack className={"product-wrapper"} style={{ height: "wrapperHeight" }}>
            {products && products.length !== 0 ? (
              products.map((product, index) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume = product.productCollection === ProductCollection.CANNED
                  ? product.productVolume + "litre"
                  : product.productSize + "size";
                return (
                  <Stack
                    key={product._id}
                    className={"product-card"}
                    onClick={() => chooseDishHandler(product._id)}
                  >
                    <Stack
                      className={"product-img"}
                      sx={{ backgroundImage: `url(${imagePath})` }}
                    >
                      <div className={"product-sale"}>{sizeVolume}</div>
                      <Button
                        className={"shop-btn"}
                        onClick={(e) => {
                          console.log("Add to cart button pressed");
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                          e.stopPropagation();
                        }}
                      >
                        <img
                          src={"/icons/shopping-cart.svg"}
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button className={"view-btn"} sx={{ right: "36px" }}>
                        <Badge badgeContent={product.productViews} color="secondary">
                          <RemoveRedEyeIcon
                            sx={{
                              color: product.productViews === 0 ? "gray" : "white",
                            }}
                          />
                        </Badge>
                      </Button>
                    </Stack>
                    <Box className={"product-desc"}>
                      <span className={"product-title"}>
                        {product.productName}
                      </span>
                      <div className={"product-desc"}>
                        <MonetizationOnIcon />
                        {product.productPrice}
                      </div>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Products are not available!</Box>
            )}
          </Stack>
          
          {/* Pagination Section */}
          <Box className="pagination-section">
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Box>


        </Stack>
      </Container>
    </div>
    </>
  );
}
