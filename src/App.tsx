import './App.css'
import Dish from "./components/Client/Dish";
import {Route, Routes} from "react-router-dom";
import Orders from "./components/admin/Orders";
import Dishes from "./components/admin/Dishes";
import AddNewDish from "./components/admin/AddNewDish";
import NavBar from "./components/NavBar/NavBar";
import EditDish from "./components/EditDish/EditDish";

function App() {

  return (
    <>
        <header>
            <NavBar/>
        </header>
        <main>
            <Routes>
                <Route path='/' element={<Dish/>} />
                <Route path='admin/dishes' element={<Dishes/>}/>
                <Route path='admin/orders' element={<Orders/>} />
                <Route path='admin/dishes/new-dish' element={<AddNewDish/>} />
                <Route path="edit-dish/:id" element={(<EditDish/>)}/>
            </Routes>
        </main>
    </>
  )
}

export default App
