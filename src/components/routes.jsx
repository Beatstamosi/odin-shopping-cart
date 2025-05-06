import App from "../App.jsx";
import Home from "./Home/Home.jsx";
import Products from "./Products/products.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";

const productLoader = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
    }
    const result =  await response.json();
    return result
}


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
    ],
  },
];

export default routes;
