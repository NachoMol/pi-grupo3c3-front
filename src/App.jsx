import './styless/App.css'
import Header from './components/Header'
import BodyContainer from './components/BodyContainer'
import { Route, Routes } from 'react-router-dom'
import Detail from "./routes/Detail"
import Home from './routes/Home'

function App() {

  return (
    <>
      <Header/>
      {<Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detail" element={<Detail />} />
      </Routes>}
    </>
  )
}

export default App
