import { useContext, createContext } from "react";

export const ProductsContext = createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
}