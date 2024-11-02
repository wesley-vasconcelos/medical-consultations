"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export interface Appointment {
  _id?: string;
  name: string;
  address: string;
  date: string;
}

export const useAppointments = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Appointment[], AxiosError>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await api.get("/appointments");
      return response.data;
    },
  });

  const createAppointment = useMutation({
    mutationFn: async (newAppointment: Appointment) => {
      const response = await api.post("/appointments", newAppointment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const updateAppointment = useMutation({
    mutationFn: async (updatedAppointment: Appointment) => {
      const { _id, ...data } = updatedAppointment;
      const response = await api.put(`/appointments/${_id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const deleteAppointment = useMutation({
    mutationFn: async (appointmentId: string) => {
      await api.delete(`/appointments/${appointmentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const getAppointmentId = async (id: string): Promise<Appointment | null> => {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar agendamento");
      }
      const data: Appointment = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    data,
    isLoading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentId,
  };
};
