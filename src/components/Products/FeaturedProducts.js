import React from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../../context/products";
import Loading from "../Loading";

//ls 233
export default function FeaturedProducts() {
  const { loading, featured } = React.useContext(ProductContext);
  if (loading) {
    // if its true
    return <Loading />;
  } // if its not
  return <ProductList title="Mais Vendidos" products={featured}></ProductList>;
}
