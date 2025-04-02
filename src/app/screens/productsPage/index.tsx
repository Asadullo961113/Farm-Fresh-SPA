import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/product.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export function ProductsPage({ onAdd }: ProductsPageProps) {
  const match = useMatch("/products/*"); // Pathni tekshirish uchun

  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct onAdd={onAdd} />} />
        <Route path="/" element={<Products onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}
