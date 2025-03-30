import React, { createContext, useContext, useState, ReactNode } from "react";

type CategoryContextType = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode; // ReactNode turini ishlatish kerak
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("FRUIT");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
