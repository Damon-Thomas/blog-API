import { User } from "lucide-react";
import "./App.css";
import Layout from "./app/layout";
import UserPosts from "./app/userPosts";

function App() {
  return (
    <div className="main">
      {/* <Layout children={null}></Layout> */}
      <UserPosts />
    </div>
  );
}

export default App;
