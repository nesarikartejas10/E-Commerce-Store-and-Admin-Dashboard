import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "*", element: <PageNotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
