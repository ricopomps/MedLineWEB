import { Queue } from "@/models/queue";
import api from "@/network/axiosInstance";

const baseUrl = "/queues";

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

export async function createQueue(doctorId: string, clinicDocument: string) {
  const response = await api.post<Queue>(`${baseUrl}`, {
    doctorId,
    clinicDocument,
  });
  return response.data;
}

export async function getQueuesRecepcionista(clinicDocument: string) {
  const response = await api.get<Queue[]>(
    `${baseUrl}/recepcionista/${clinicDocument}`
  );
  return response.data;
}
