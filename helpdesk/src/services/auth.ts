import { api } from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
}
