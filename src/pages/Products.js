import React from "react";
import { ProductContext } from "../context/products";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";

export default function Products() {
  const { loading, products } = React.useContext(ProductContext);

  if (loading) {
    return <Loading />; //  If True loading
  } //  or once I have all the products return ProductList
  return <ProductList title="nossos produtos" products={products} />;
}
