import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Button, CircularProgress, Link } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DialerSipOutlined";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFreshArrivals } from "./selector"; // Ensure correct path to your selector
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService"; // Ensure you import ProductService
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { AspectRatio } from "@mui/joy";

/** REDUX SLICE & SELECTOR **/
const freshArrivalsRetriever = createSelector(
  retrieveFreshArrivals,
  (freshArrivals) => ({ freshArrivals })
);

export default function FreshArrivals() {
  
  // Redux-dan barcha mahsulotlarni olish
  const { freshArrivals } = useSelector(freshArrivalsRetriever);
  
  // State: Tanlangan kategoriya va mahsulotlar
  const [selectedCategory, setSelectedCategory] = useState<ProductCollection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Kategoriya bo'yicha mahsulotlarni filtrlash
  const filteredProducts = selectedCategory
  ? freshArrivals.filter((product: Product) => product.productCollection === selectedCategory)
  : freshArrivals;

  const displayDishes = filteredProducts.length ? filteredProducts : products;



    // Mahsulotlarni qidirish va yuklash
  const [productSearch, setProductSearch] = useState({
    page: 1,
    limit: 4,
    order: "createdAt",
    productCollection: ProductCollection.FRUIT,
    search: "",
  });
  

  
  // Fetch products based on productSearch state
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productService = new ProductService();
        const data = await productService.getProducts(productSearch);
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.log("No products found or invalid data format");
          setProducts([]);
        }
      } catch (err) {
        console.log("Error fetching products", err);
        setError("Failed to load products!");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [productSearch]); // Bu yerda productSearchni qaramaslik kerak
  


  // Kategoriya o'zgartirilganda ishlaydigan funksiya
  const handleCategoryChange = (category: ProductCollection) => {
    setSelectedCategory(category);
    setProductSearch(prevState => ({
      ...prevState,
      productCollection: category,
      page: 1, // Aslida sahifa raqamini 1-ga qaytarish mumkin
    }));
  };
  


  return (
    <div className={"fresh-arrivals"}>
      <Container>
        <Stack className={"fresh-section"}>
          <Box className={"category-title"}>Fresh Arrivals</Box>

          {/* Kategoriya Buttonlari */}
          <Stack direction="row" spacing={2} className="category-links">
            <Link
            component="button"
            onClick={() => handleCategoryChange(ProductCollection.FRUIT)}
            className={`category-link ${selectedCategory === ProductCollection.FRUIT ? 'active' : ''}`}
            sx={{textDecoration: " none"}}
            >
            Fresh Fruits
            </Link>
          

            <Link
            component="button"
            onClick={() => handleCategoryChange(ProductCollection.VEGETABLE)}
            className={`category-link ${selectedCategory === ProductCollection.VEGETABLE ? 'active' : ''}`}
            sx={{textDecoration: " none"}}
            >
            Fresh Vegetables
            </Link>

            <Link
              component="button"
              onClick={() => handleCategoryChange(ProductCollection.CANNED)}
              className={`category-link ${selectedCategory === ProductCollection.CANNED ? 'active' : ''}`}
              sx={{textDecoration: " none"}}
            >
              Canned Foods
            </Link>

            <Link
              component="button"
              onClick={() => handleCategoryChange(ProductCollection.DESSERT)}
              className={`category-link ${selectedCategory === ProductCollection.DESSERT ? 'active' : ''}`}
              sx={{textDecoration: " none"}}
            >
              Desserts
            </Link>

            <Link
              component="button"
              onClick={() => handleCategoryChange(ProductCollection.OTHERS)}
              className={`category-link ${selectedCategory === ProductCollection.OTHERS ? 'active' : ''}`}
              sx={{textDecoration: " none"}}
            >
              Other
            </Link>
          </Stack>

          {/* Loading State */}
          {loading && <CircularProgress />}

          {/* Error Message */}
          {error && <Box color="red">{error}</Box>}

          {/* Mahsulotlarni Ko'rsatish */}
          <Stack className={"cards-frame"}>
            {(filteredProducts.length || products.length) ? (
              (filteredProducts.length ? filteredProducts : products).map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                const sizeVolume = 
                product.productCollection === ProductCollection.CANNED ? product.productVolume + " litter": product.productSize + " SIZE";

                return (
                  <CssVarsProvider key={product._id}>
                    <Card className="card">
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={product.productName} />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent className="card-content">
                        <Stack flexDirection="column" gap={2}>
                          <Typography  className="product-name">
                            {product.productName}
                          </Typography>
                          <Typography  className="product-price">
                            Price: ${product.productPrice}
                          </Typography>
                          <Typography  className="product-left">
                            Left Count: {product.productLeftCount} 
                          </Typography>
                          <Typography className="product-views">
                            {product.productViews}
                            <VisibilityIcon
                                sx={{ fontSize: 25, marginLeft: "5px", color: "#333"}}
                              />
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow className="card-footer">
                        <Typography startDecorator={<DescriptionOutlinedIcon />} className="product-description">
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                      </Card>

                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className={"no-data"}>fresh arrival products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
