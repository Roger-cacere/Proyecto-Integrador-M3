import { useState } from "react";
import {useLocation} from "react-router-dom"
import Inicio from "./views/Inicio/Inicio";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import MisTurnos from "./views/Appointments/MisTurnos";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import CreateAppointment from "./views/createAppointment/CreateAppointment";
import Home from "./views/Home/Home";
import "./index.css";
import "./reset.css";

function App() {
  const [userLogged, setUserLogged] = useState(false); 
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ? null : (
        <Navbar userLogged={userLogged} setUserLogged={setUserLogged}  />
      )}
      <div>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/inicio" element={<Inicio />}></Route>
          <Route path="/misTurnos" element={<MisTurnos />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login setUserLogged={setUserLogged} />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/crearTurno" element={<CreateAppointment />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
