import { useLoaderData } from "react-router-dom";
import ProductSection from "../components/ProductSection";

const Product = () => {
  const product = useLoaderData();

  return (
    <main>
      <ProductSection name={product.name} price={product.price} id={product.id} />
    </main>
  );
};

export default Product;
