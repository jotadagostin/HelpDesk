import { api } from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role?: string
) {
  const body: any = { name, email, password };
  if (role) body.role = role;
  const response = await api.post("/auth/register", body);
  return response.data;
}
