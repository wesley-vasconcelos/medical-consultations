"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Appointment, useAppointments } from "@/hooks/useAppointments";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import TextInput from "@/components/input";
import Button from "@/components/button";

const appointmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  date: z.string().refine((val) => val !== "", {
    message: "Data e hora são obrigatórias",
  }),
  address: z.string().min(1, "Endereço é obrigatório"),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const EditAppointments = () => {
  const router = useRouter();
  const { id } = useParams();
  const { getAppointmentId, updateAppointment } = useAppointments();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data: Appointment | null = await getAppointmentId(id as string);

        if (data && isAppointment(data)) {
          setAppointment(data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.error("Erro ao buscar agendamento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointment();
  }, [id, getAppointmentId]);

  const isAppointment = (data: Appointment) => {
    return (
      data &&
      typeof data.name === "string" &&
      typeof data.date === "string" &&
      typeof data.address === "string"
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao buscar agendamento.");
    }

    if (appointment) {
      setValue("name", appointment.name);
      const formattedDate = new Date(appointment.date)
        .toISOString()
        .slice(0, 16);
      setValue("date", formattedDate);
      setValue("address", appointment.address);
    }
  }, [appointment, isError, setValue]);

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      if (typeof id === "string") {
        const appointmentData = {
          id,
          title: "",
          ...data,
        };
        await updateAppointment.mutateAsync(appointmentData);
        toast.success("Agendamento atualizado com sucesso!");
        router.push("/");
      } else {
        toast.error("ID inválido.");
      }
    } catch {
      toast.error("Erro ao atualizar agendamento.");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput id="name" label="Nome" errors={errors} />
      <div>
        <label htmlFor="dateTime">Data e Hora:</label>
        <input
          id="dateTime"
          type="datetime-local"
          className="border p-2 rounded w-full"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>
      <TextInput id="address" label="Endereço" errors={errors} />
      <div className="flex justify-end">
        <Button type="submit" variant="filled" className="md:w-auto">
          Atualizar Agendamento
        </Button>
      </div>
    </form>
  );
};
