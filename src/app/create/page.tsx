import { Appointment } from "@/components/appointments";

export default function Create() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-left">
          Criar Agendamento
        </h1>
        <Appointment.Create />
      </div>
    </div>
  );
}
