import "./App.css";
import "./index.css";
import Home from "./components/pages/mainpage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./components/pages/postpage.tsx";
import NotFound from "./components/pages/404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "post",
    element: <Post />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
