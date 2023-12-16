import { SignUpFormData } from "@/app/signUp/page";
import { User } from "@/models/user";
import api from "@/network/axiosInstance";

const baseUrl = "/users";

export enum UserType {
  pacient = "paciente",
  recepcionista = "recepcionista",
  doctor = "doctor",
}

export async function getMessage() {
  const response = await api.get<{ message: string }>("");
  return response.data;
}

export async function getAuthenticatedUser() {
  const response = await api.get<User>(`${baseUrl}/me`);
  return response.data;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await api.post<User>(`${baseUrl}/login`, credentials);
  return response.data;
}

export type SignUpCredentials = SignUpFormData & {
  userType: UserType;
};

export async function signUp(credentials: SignUpCredentials) {
  const response = await api.post<User>(`${baseUrl}/signup`, credentials);
  return response.data;
}

export async function requestEmailVerificationCode(email: string) {
  await api.post(`${baseUrl}/verificationcode`, { email });
}

export async function getUser(userId: string) {
  const response = await api.get<User>(`${baseUrl}/${userId}`);
  return response.data;
}
