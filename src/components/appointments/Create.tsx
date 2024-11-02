"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAppointments } from "@/hooks/useAppointments";
import TextInput from "@/components/input";
import Button from "@/components/button";
import { AxiosError } from "axios";

const appointmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  date: z.string().refine((val) => val !== "", {
    message: "Data e hora são obrigatórias",
  }),
  address: z.string().min(1, "Endereço é obrigatório"),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const Create = () => {
  const router = useRouter();
  const { createAppointment } = useAppointments();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      await createAppointment.mutateAsync(data);
      toast.success("Agendamento criado com sucesso!");
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(
          error.response.data.message || "Erro ao processar a solicitação."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput id="name" label="Nome" register={register} errors={errors} />

      <div>
        <label htmlFor="dateTime">Data e Hora:</label>
        <input
          id="dateTime"
          type="datetime-local"
          {...register("date")}
          className="border p-2 rounded w-full"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <TextInput
        id="address"
        label="Endereço"
        register={register}
        errors={errors}
      />

      <div className="flex justify-end">
        <Button type="submit" variant="filled" className="md:w-auto">
          Criar Agendamento
        </Button>
      </div>
    </form>
  );
};
