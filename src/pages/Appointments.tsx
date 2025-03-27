import { useState, useEffect } from "react";
import { api } from "../api/api";
import React from "react";

interface Appointment {
  id: number;
  espacio: string;
  hora: string;
  paciente: string;
  doctor: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState({ espacio: "", hora: "", paciente: "", doctor: "" });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const response = await api.get("/appointments");
    setAppointments(response.data);
  };

  const addAppointment = async () => {
    await api.post("/appointments", newAppointment);
    setNewAppointment({ espacio: "", hora: "", paciente: "", doctor: "" });
    fetchAppointments();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Citas</h2>
      <input className="border p-2 m-2" placeholder="Espacio" onChange={(e) => setNewAppointment({ ...newAppointment, espacio: e.target.value })} />
      <input className="border p-2 m-2" placeholder="Hora" onChange={(e) => setNewAppointment({ ...newAppointment, hora: e.target.value })} />
      <input className="border p-2 m-2" placeholder="Paciente" onChange={(e) => setNewAppointment({ ...newAppointment, paciente: e.target.value })} />
      <input className="border p-2 m-2" placeholder="Doctor" onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })} />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={addAppointment}>Agregar</button>

      <ul className="mt-4">
        {appointments.map((a) => (
          <li key={a.id} className="border p-2">{a.espacio} - {a.hora} - {a.paciente} - {a.doctor}</li>
        ))}
      </ul>
    </div>
  );
}
