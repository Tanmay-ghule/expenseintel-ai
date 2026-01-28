const API_URL = "http://127.0.0.1:8000";

// -------------------------------------------------------------------
// Centralized API Request Helper
// -------------------------------------------------------------------

export async function apiRequest(endpoint, method = "GET", body = null, token) {
  const headers = {};

  // Attach JWT token if available
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Set JSON header for POST/PUT requests
  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // Handle unauthorized access
  if (response.status === 401) {
    throw new Error("Invalid token");
  }

  // Handle API errors
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "API Error");
  }

  return response.json();
}
