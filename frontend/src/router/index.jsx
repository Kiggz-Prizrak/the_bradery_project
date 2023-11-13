import { createBrowserRouter } from "react-router-dom";

import { getAllProducts, getOneProduct, getUserData } from "../api";


import Root from "./Root";

import Login from "../pages/Login";
import Product from "../pages/Product";
import Account from "../pages/Account";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";


const router = createBrowserRouter(
  
  [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => {
          return getAllProducts();
        },
      },
      {
        path: "/product/:id",
        element: <Product />,
        loader: ({ params }) => {
          return getOneProduct(params.id);
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/account",
        element: <Account />,
        // loader: ({ params }) => {
        //   return getUserData(params.id);
        // },
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
