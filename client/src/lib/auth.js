import axios from "axios";

export async function register(credentials) {
  try {
    return await axios.post("/api/auth/register", credentials);
  } catch (err) {
    console.error(err);
  }
}

export async function login(credentials) {
  try {
    return await axios.post("/api/auth/login", credentials);
  } catch (err) {
    console.error(err);
  }
}

export function loginWithGoogle() {
  return window.open("/api/auth/google", "_self");
}

export async function logout() {
  try {
    return await axios.post("/api/auth/logout");
  } catch (err) {
    console.error(err);
  }
}

async function isAuthenticated() {
  try {
    let response = await axios.get("/api/auth/status");
    return { isAuthenticated: response.data };
  } catch (err) {
    console.error(err);
    return { isAuthenticated: false };
  }
}

export const authQuery = () => ({
  queryKey: ["isAuthenticated"],
  queryFn: isAuthenticated,
});
