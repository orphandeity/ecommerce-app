import axios from "axios";

export async function login(credentials) {
  const response = await axios.post("/api/auth/login", credentials);
  const user = response.data;
  return { user };
}
