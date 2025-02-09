import { useEffect } from "react";
import { Outlet, Route, Navigate } from "react-router-dom";
import Layout from "../Components/LayoutElements/Layout";



export const OpenRoutes = ({ authUser }) => {
    return authUser &&
        <Outlet />
}