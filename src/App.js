import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <section className="container">
      <section className="d-flex app__wrapper">
        <div>
          <Sidebar />
        </div>
        <div className="flex-grow-1">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
            </Routes>
          </BrowserRouter>
        </div>
      </section>
    </section>
  );
}

export default App;
