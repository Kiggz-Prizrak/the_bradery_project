import { useLoaderData } from "react-router-dom";

const Home = () => {

  const productList = useLoaderData();

  console.log(productList)

  return <div>Home</div>;
};

export default Home;
