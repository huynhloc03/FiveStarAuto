import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useNavigate
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Add from "./pages/Add.jsx";
import Car from "./pages/Car.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./style.scss";
import isAgent from "./api_context/authChecker";
import { useEffect, useState, useContext } from 'react';
import Support from "./pages/Support.jsx";
import SupportConfirmation from "./pages/SupportConfirmation.jsx";
import Payment from "./pages/Payment.jsx";
import { CartProvider, cartContext } from "./api_context/cartContext.js";
import Purchase from './pages/Purchase.jsx';
import Orders from "./pages/Order.jsx";
import SaleDistributionConfirmation from "./pages/SaleDistributionConfirmation";
import SaleDistribution from "./pages/SaleDistribution";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize isUserAgent state
  const [isUserAgent, setIsUserAgent] = useState(false);

  // Check if the user is an agent
  useEffect(() => {
    setIsUserAgent(isAgent());
  }, []);

  useEffect(() => {
    // If the user is not an agent and is trying to access the "Add" page, redirect to the login page
    if (!isUserAgent && location.pathname.startsWith("/add")) {
      throw new Error("You are not authorized!");

    }
  }, [isUserAgent, location.pathname, navigate]);

  // Render the layout
  return (
    <>
      <Navbar isUserAgent={isUserAgent} />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/car/:id",
        element: <Car />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/supportconfirmation",
        element: <SupportConfirmation />
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: '/purchase',
        element: <Purchase />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: "/SaleDistributionConfirmation",
        element: <SaleDistributionConfirmation />
      },

      
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/SaleDistribution",
    element: <SaleDistribution />
  }
]);

function App() {
  return (
    <CartProvider>
      <div className="app">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
     </CartProvider>
  );
}

export default App;
