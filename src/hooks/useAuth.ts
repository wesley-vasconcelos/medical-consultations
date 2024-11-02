import { useState } from "react";
import axios from "@/lib/axios";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/auth", credentials);
      const token = response.data.token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/;`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
