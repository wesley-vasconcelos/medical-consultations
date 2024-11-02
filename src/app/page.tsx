"use client";

import { Appointment } from "@/components/appointments";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateAppointment = () => {
    router.push("/create");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Agendamentos</h1>
          <button
            onClick={handleCreateAppointment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Criar Agendamento
          </button>
        </div>
        <Appointment.List />
      </div>
    </div>
  );
}
