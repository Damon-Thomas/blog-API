import "./App.css";
import "./index.css";
import Home from "./components/pages/mainpage.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromChildren,
} from "react-router-dom";
import PostPage from "./components/pages/postpage.tsx";
import NotFound from "./components/pages/404.tsx";

//layout
import Layout from "./components/pages/layout.tsx";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="post/:id" element={<PostPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
