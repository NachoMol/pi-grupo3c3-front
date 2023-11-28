import './styless/App.css'
import { Route, Routes } from 'react-router-dom'
import Detail from "./routes/Detail"
import Admin from "./routes/Admin"
import Home from './routes/Home'
import Header from './components/Header'
import ShowCars from './routes/ShowCars'
import Register from './routes/Register'
import InsertVehicle from './routes/InsertVehicle'
import UsersList from './routes/UsersList'
import Footer from './components/Footer'
import Login from './routes/Login'
import Feature from './routes/Feature'
import VehiclesList from './routes/VehiclesList'
import UpdateVehicle from './routes/UpdateVehicle'
import Context from './context/Context'
import UserProfile from './routes/UserProfile'
import InsertCategory from './routes/InsertCategory'
import UserFavorites from './routes/UserFavorites'
import DetailsList from './routes/DetailsList'
import UpdatePolicies from './routes/UpdatePolicies'
import AddDetails from './routes/AddDetails'
import UpdateDetails from './routes/UpdateDetails'
import CategoryList from './routes/CategoryList'

function App() {

  
  return (
    <>
    <Context>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<ShowCars />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/users' element={<UsersList />} />
        <Route path='/admin/insert-vehicle' element={<InsertVehicle />} />
        <Route path="/login" element={<Login />} />
        <Route path='/feature' element={<Feature />} />
        <Route path='/admin/vehicles' element={<VehiclesList />} />
        <Route path='/admin/update-vehicle' element={<UpdateVehicle />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path='/admin/insert-category' element={<InsertCategory/>} />
        <Route path="/userFavorites" element={<UserFavorites />} />
        <Route path="/admin/details-list" element={<DetailsList />} />
        <Route path="/admin/add-detail" element={<AddDetails />} />
        <Route path="/admin/update-detail/:id" element={<UpdateDetails />} />
        <Route path="/admin/update-policies" element={<UpdatePolicies />} />
        <Route path="/admin/category-list" element={<CategoryList />} />
      </Routes>
      <Footer />
    </Context>
  </>
  )
}

export default App
