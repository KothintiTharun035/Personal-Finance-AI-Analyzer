import api from "./api";

export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(payload) {
  const response = await api.post("/auth/register", payload);

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/users/me");

  return response.data;
}

export async function updateProfile(payload) {
  const response = await api.put("/users/me", payload);

  return response.data;
}

export async function getDashboardSummary() {
  const response = await api.get("/dashboard/summary");

  return response.data.data;
}