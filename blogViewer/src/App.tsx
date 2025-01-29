import './App.css'
import HeaderBar from './components/Header/HeaderBar'
import PreviewContainer from './components/BlogPreviews/PreviewContainer'
import { Toaster } from 'sonner'

function App() {

  return (
    <div className="p-4 md:p-6 lg:p-8 mainBody flex flex-col content-start w-screen min-h-screen">
      <HeaderBar />
      <PreviewContainer />
      <Toaster position="bottom-right"></Toaster>
    </div>
  )
}

export default App
