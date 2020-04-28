import React from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts } from "../utils/helpers";

export const ProductContext = React.createContext();

// method createContext getting me back  3 things - ProductProvider(send this to index.js), Consumer, useContext(224)

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

  // useEffect(228)
  // let's perform site effects - data fetching, window event listener
  // by default runs after every render
  // callback function as first parameter by default
  // returns cleanup function to avoid memory leaks, so cannot be async
  // second argument - array of values(dependencies)

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
