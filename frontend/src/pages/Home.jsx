import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

const Home = () => {
  const data = useLoaderData();

  const [productList, setProductList] = useState(Array.from(data));
  const [resultSearchProduct, setResultSearchProduct] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue) {
      const listMatch = productList.filter((list) =>
        list.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResultSearchProduct(listMatch);
    } else {
      console.log(searchValue)
      setResultSearchProduct(Array.from(data));
    }
  }, [searchValue]);


  return (
    <main className="home_container">
      
        <h2> search product</h2>
        <div className="product_search">
          <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <div className="productList_container">
          {resultSearchProduct.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              id={product.id}
              price={product.price}
            />
          ))}
        </div>
     
    </main>
  );
};

export default Home;
