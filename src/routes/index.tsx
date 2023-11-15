import React from "react";
import { Route, Routes } from "react-router-dom";
import { constants } from "../assets/constants";
import Search from "../components/Search/search";
import Show from "../components/Show";
import { RouteTypes } from "../types";

const { paths } = constants;

const appRoutes: RouteTypes[] = [
    { id: "SEARCH", path: paths.search, element: <Search /> },
    { id: "SHOW", path: paths.show, element: <Show /> },
];

const AppRoutes = () => {
    return (
        <Routes>
            {appRoutes.map(({ id, path, element }) => (
                <Route key={id} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
