import App from "../App.jsx";
import Home from "./Home/Home.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export default routes;
