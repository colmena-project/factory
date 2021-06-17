export function handleResponse(response: string) {
  return JSON.parse(response);
}

export function handleError(error: { data: string; }) {
  if (error.data) {
    return error.data;
  }
  return error;
}
