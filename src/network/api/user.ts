import api from "@/network/axiosInstance";

const baseUrl = "";

export async function getMessage() {
  const response = await api.get<{ message: string }>("");
  return response.data;
}
