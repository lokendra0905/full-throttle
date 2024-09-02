import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import Cars from "../components/Cars";
import MainLayout from "../Layout/MainLayout";
import Bids from "../components/Bids";

const MainRoutes = () => {
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cars", element: <Cars /> },
        { path: "/bids", element: <Bids /> },
      ],
    },
  ]);

  return <RouterProvider router={Routes} />;
};

export default MainRoutes;
