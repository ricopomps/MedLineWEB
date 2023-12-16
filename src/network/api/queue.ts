import { Queue } from "@/models/queue";
import api from "@/network/axiosInstance";

const baseUrl = "/queues";

export enum UserType {
  pacient = "paciente",
  recepcionista = "recepcionista",
  doctor = "doctor",
}

export async function getQueue(code: string) {
  const response = await api.get<Queue>(`${baseUrl}/${code}`);
  return response.data;
}

export async function enterQueue(code: string, userId: string) {
  const response = await api.post<Queue>(`${baseUrl}/${code}`, { userId });
  return response.data;
}

export async function getAllQueuesCodes() {
  const response = await api.get<string[]>(`${baseUrl}/codes`);
  return response.data;
}

export async function getQueuesByUser(userId: string) {
  const response = await api.get<Queue[]>(`${baseUrl}/user/${userId}`);
  return response.data;
}
