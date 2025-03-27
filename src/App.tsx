import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Spaces from "./pages/Spaces";
import React from "react";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/spaces" element={<Spaces />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
