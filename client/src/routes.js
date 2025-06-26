import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Navigate
  } from "react-router-dom";
import App from "./App";
import Cookies from 'js-cookie';
import CheckAuth from './utils/CheckAuth';
import  Guest from './utils/Guest'
export default createBrowserRouter([
    {
      element: <App/>,
      children: [
        {
          path: "/",
          element:(<CheckAuth>
            <Home/>
          </CheckAuth>
          ),
        },
        {
          path: "/Login",
          element: (
            <Guest>
              <Login/>
            </Guest>
          ),
        },
        {
          path: "/Register",
          element: (
            <Guest>
              <Register/>
            </Guest>
          )
        },
      ],
    },
  ]);