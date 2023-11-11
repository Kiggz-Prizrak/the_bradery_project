import { useLoaderData } from "react-router-dom";
import ProductSection from "../components/ProductSection";

const Product = () => {
  const product = useLoaderData();
  console.log(product);

  return (
    <main>
      <ProductSection name={product.name} price={product.price} />
    </main>
  );
};

export default Product;
