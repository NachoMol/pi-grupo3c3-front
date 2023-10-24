import './styless/App.css'
import { Route, Routes } from 'react-router-dom'
import Detail from "./routes/Detail"
import Home from './routes/Home'
import CarGallery from './routes/CarGallery'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detail" element={<Detail />} />
        <Route path="/carGallery" element={<CarGallery />} />
      </Routes>
    </>
  )
}

export default App
