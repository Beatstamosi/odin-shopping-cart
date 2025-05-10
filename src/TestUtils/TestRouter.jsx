// test-utils/TestRouter.jsx
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Home from "../components/Home/Home.jsx";
import Products from "../components/Products/Products.jsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.jsx";
import ProductOverview from "../components/Product Overview/ProductOverview.jsx";
import ShoppingCart from "../components/Shopping Cart/ShoppingCart.jsx";
import Search from "../components/Search/Search.jsx";

// Reusable mock products
export const mockProducts = [
  { id: 1, title: "Test Product 1", price: 10, image: "", description: "" },
  { id: 2, title: "Test Product 2", price: 20, image: "", description: "" },
];

// Reusable router setup function
export function renderWithRouter(initialRoute = "/") {
  const testRoutes = [
    {
      path: "/",
      element: <App />,
      loader: () => mockProducts,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductOverview /> },
        { path: "cart", element: <ShoppingCart /> },
        { path: "search", element: <Search /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ];

  const router = createMemoryRouter(testRoutes, {
    initialEntries: [initialRoute],
  });

  return {
    router,
    ui: <RouterProvider router={router} />,
  };
}
