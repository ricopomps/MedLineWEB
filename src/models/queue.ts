import { User } from "./user";

export interface Queue {
  _id: string;
  code: string;
  users: User[];
  doctorId: string;
  createdAt: string;
}
