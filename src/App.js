import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import HotelList from "./pages/hotelList/HotelList";
import AddHotel from "./pages/addHotel/AddHotel";
import RoomList from "./pages/roomList/RoomList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/hotels" element={<HotelList />} />
        <Route exact path="/rooms" element={<RoomList />} />

        <Route exact path="/add-hotel" element={<AddHotel />} />
        <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
      </Routes>
    </BrowserRouter>
  );
  // return (
  //   <section className="pt-3 app__container">
  //     <section className="row d-flex">
  //       <div className="col-2 border-secondary border-end border-bottom p-1 text-center fw-bold">
  //         <span className="purple-text">Admin Page</span>
  //       </div>
  //       <div className="col-10 border-secondary border-start border-bottom"></div>
  //     </section>
  //     <section className="row d-flex">
  //       <div className="col-2 border-secondary border-end border-top">
  //         <Sidebar />
  //       </div>
  //       <div className="col-10 border-secondary border-start border-top">
  //         <BrowserRouter>
  //           <Routes>
  //             <Route exact path="/" element={<Dashboard />} />
  //             <Route exact path="/login" element={<Login />} />

  //             <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
  //           </Routes>
  //         </BrowserRouter>
  //       </div>
  //     </section>
  //   </section>
  // );
}

export default App;
