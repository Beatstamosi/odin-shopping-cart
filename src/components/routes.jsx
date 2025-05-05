import App from "../App.jsx";
import Home from "./Home/Home.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]

export default routes;