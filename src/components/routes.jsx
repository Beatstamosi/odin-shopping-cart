import App from "../App.jsx";
import Home from "./Home/Home.jsx";
import Products from "./Products/Products.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import ProductOverview from "./Product Overview/ProductOverview.jsx";
import ShoppingCart from "./Shopping Cart/ShoppingCart.jsx";
import Search from "./Search/Search.jsx";

const productLoader = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: productLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductOverview />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
