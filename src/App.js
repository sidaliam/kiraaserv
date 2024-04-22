import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import ReservationDetailsPage from "./pages/Reservat/ReservationDetailsPage";
import Signup from "./pages/Signup/Signup";
import Agences from "./pages/agences/agences";
import Contact from "./pages/contact/contact";
import About from "./pages/about/about";




function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agences" element={<Agences />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/hotels" element={<List />}/>
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/reservation-details" element={<ReservationDetailsPage />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
