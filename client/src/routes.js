import { createBrowserRouter, Navigate } from "react-router-dom";
  
import Home from './pages/Home';
import Login from './pages/Login';
import App from './App';
import Register from './pages/Register';
import CheckAuth from "./utils/CheckAuth";
import Guest from "./utils/Guest";

export default createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <CheckAuth>
            <Home />
          </CheckAuth>,
        },
        {
            
          path: "/register",
          element: <Guest>
                    <Register />
                </Guest>,
        },
        {
          path: "/login",
          element: <Guest>
            <Login />
          </Guest>,
        },
      ]
    },
  ]);
  
  