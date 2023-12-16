import { UserType } from "@/network/api/user";
import { TooManyRequestsError } from "@/network/http-errors";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export function handleError(error: unknown) {
  if (error instanceof TooManyRequestsError) {
    toast.error("Too many requests, please wait a while");
  } else if (isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error: string }>;
    if (axiosError.response?.data?.error) {
      toast.error(axiosError.response.data.error);
    } else {
      toast.error("An error occurred.");
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("An error occurred.");
  }
}

export function getUserTypeName(usertype: UserType) {
  switch (usertype) {
    case UserType.pacient:
      return "Paciente";
    case UserType.doctor:
      return "Médico";
    case UserType.recepcionista:
      return "Recepcionista";
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
