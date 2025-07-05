import { createBrowserRouter } from "react-router";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ShortenedUrl } from "./pages/ShortenedUrl";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { CentralizedSectionLayout } from "./layouts/CentralizedSectionLayout";

export const routes = createBrowserRouter([
    {
        path: '/', 
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />, 
            },
        ]
    },
    {
        path: '/', 
        element: <CentralizedSectionLayout />,
        children: [
            {
                path: '/:shortenedUrl', 
                element: <ShortenedUrl />, 
            },
            {
                path: '/not-found',
                element: <NotFound />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    

])