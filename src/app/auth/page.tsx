"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/input/";
import Button from "@/components/button";

const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginError(null);
    try {
      await login(data);
      router.push("/");
    } catch {
      setLoginError("Falha ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <TextInput
            id="password"
            label="Senha"
            type="password"
            register={register}
            errors={errors}
          />
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
          <Button type="submit" variant="filled" className="w-full">
            {isLoading ? "Carregando..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
