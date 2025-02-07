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
import PostCreator from "./app/postCreator";
import PostsPage from "./app/postsPage";
import CommentsPage from "./app/commentsPage";
import PostEditor from "./app/postEditor";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="postCreator" element={<PostCreator />} />
        <Route path="posts" element={<PostsPage />}></Route>
        <Route path="posts/:postId" element={<PostEditor />} />
        <Route path="comments" element={<CommentsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
