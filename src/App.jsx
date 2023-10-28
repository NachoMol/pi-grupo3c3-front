import './styless/App.css'
import { Route, Routes } from 'react-router-dom'
import Detail from "./routes/Detail"
import Admin from "./routes/Admin"
import Home from './routes/Home'
import Header from './components/Header'
import ShowCars from './routes/ShowCars'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/show" element={<ShowCars />} />
      </Routes>
    </>
  )
}

export default App
