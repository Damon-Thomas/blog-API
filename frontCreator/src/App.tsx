import "./App.css";
import "./index.css";
import Layout from "./app/layout";
import NotFound from "./app/notFound";
import Home from "./app/home";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromChildren,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
