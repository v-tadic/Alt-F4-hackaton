import './App.css'
import LoginPage from "./Pages/Login.jsx";
import LandingPage from "./Pages/Landing.jsx";
import MainApp from "./Pages/MainApp.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {path: "/", element: <LandingPage />},
    {path: "/login", element: <LoginPage />},
    {path: "/main", element: <MainApp />},
    {path: "*", element: <NotFoundPage />}
])


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
