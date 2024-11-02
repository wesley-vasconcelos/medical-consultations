"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { formatDateTime } from "@/app/utils/formatDate";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

export const List = () => {
  const { data, deleteAppointment } = useAppointments();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment.mutateAsync(id);
      toast.success("Agendamento excluído com sucesso!");
    } catch {
      toast.error("Erro ao excluir agendamento.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        {data && data.length === 0 ? (
          <div className="flex items-center justify-center ">
            <p className="text-gray-500 text-lg">
              Nenhum agendamento encontrado.
            </p>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Nome
                </th>
                <th className="px-4 py-2 border-b border-gray-300 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Endereço
                </th>
                <th className="px-4 py-2 border-b border-gray-300 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Data
                </th>
                <th className="px-4 py-2 border-b border-gray-300 bg-gray-100 text-center text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((appointment) => (
                <tr key={`${appointment._id}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-300 text-gray-800 text-sm">
                    {appointment.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-gray-800 text-sm">
                    {appointment.address}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-gray-800 text-sm">
                    {formatDateTime(appointment.date)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 text-center">
                    <Button
                      onClick={() =>
                        !!appointment._id && handleEdit(appointment._id)
                      }
                      className="mr-2 md:w-auto"
                      variant="filled"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() =>
                        !!appointment._id && handleDelete(appointment._id)
                      }
                      className="bg-red-500 hover:bg-red-600 md:w-auto"
                      variant="filled"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
