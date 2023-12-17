import { UserType } from "@/network/api/user";

export interface User {
  _id: string;
  email?: string;
  name: string;
  cpf: string;
  createdAt: string;
  userType: UserType;
  clinicDocument?: string;
}
