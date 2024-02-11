import { User } from "./user";

export interface Queue {
  _id: string;
  code: string;
  users: User[];
  doctorId: string;
  createdAt: string;
  status: QueueStatus;
}

export enum QueueStatus {
  waiting = "aguardando",
  ready = "pronto",
  inProgress = "em progresso",
  done = "finalizado",
}
