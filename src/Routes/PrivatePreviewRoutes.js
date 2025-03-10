import { useEffect } from "react";
import { Outlet, Route, Navigate } from "react-router-dom";
import Layout from "../Components/LayoutElements/Layout";



export const PrivatePreviewRoutes = ({ authUser }) => {
    return authUser ?
        <Outlet />
        : 
        null
}