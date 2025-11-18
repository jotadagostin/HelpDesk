import { api } from "./api";

export async function getProfile() {
  return api.get("/users/me");
}

export async function updateProfile(data: FormData) {
  return api.put("/users/me", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function updatePassword(current: string, newPassword: string) {
  return api.put("/users/me/password", {
    currentPassword: current,
    newPassword,
  });
}
