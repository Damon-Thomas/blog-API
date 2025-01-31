import HeaderBar from "../Header/HeaderBar";
import { Toaster } from "../ui/sonner.tsx";
import BlogPreviewContainer from "../BlogPreviews/previewContainer.tsx";

function Home() {
  return (
    <div className="p-4 md:p-6 lg:p-8 mainBody flex flex-col content-start w-screen min-h-screen">
      <HeaderBar />
      <BlogPreviewContainer />
      <Toaster position="bottom-right"></Toaster>
    </div>
  );
}

export default Home;
