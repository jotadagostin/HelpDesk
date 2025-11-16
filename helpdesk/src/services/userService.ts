import axios from "axios";

export async function fetchUsers() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get("http://localhost:3000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
