import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

ProductCard;

const Home = () => {
  const productList = useLoaderData();

  console.log(productList);

  return (
    <main>
      <div>
        <div className="productList_container">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              id={product.id}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
