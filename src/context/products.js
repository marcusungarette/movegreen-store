import React from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts } from "../utils/helpers";

export const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      const bestSellers = featuredProducts(response.data);
      setProducts(response.data);
      setFeatured(bestSellers);
      setLoading(false);
    });
    return () => {};
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
