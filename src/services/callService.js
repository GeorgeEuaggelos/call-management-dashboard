export const BASE_URL = import.meta.env.VITE_API_URL;
export const USER_ID = 'george';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "X-User-Id": USER_ID, ...options.headers },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(body.error || "Request failed");
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export const getCalls = () => request("/calls").then(data => data.calls);
export const getCallById = (id) => request(`/calls/${id}`);
export const archiveCall = (id) => request(`/calls/${id}/archive`, { method: "PATCH" });