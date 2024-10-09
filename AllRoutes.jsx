import { createBrowserRouter } from "react-router-dom";
import HomeWrapper from "./HomeWrapper";
import Home from "../pages/Home";
import SignupCard from '../pages/LoginSignup';
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProtectedRoute from "../component/ProtectedRoute";
import Profile from "../pages/Profile";
import SingleProduct from "../pages/SingleProduct"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeWrapper val={false} />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/products",
                element: <HomeWrapper val={true} />,
                children:[
                    {
                        path: ":id",
                        element: <SingleProduct />
                    },
                    {
                        index:true,
                        element:<Products/>
                    }
                ]
            },
            {
                path: "/cart",
                element: <HomeWrapper val={true} />,
                children:[
                    {
                        index:true,
                        element:<Cart/>
                    }
                ]
            },
            {
                path: "/login",
                element: <HomeWrapper val={true} />,
                children:[
                    {
                        index:true,
                        element:<SignupCard/>
                    }
                ]
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

export default router;
