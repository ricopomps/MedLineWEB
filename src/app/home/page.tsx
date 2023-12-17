"use client";

import CreateQueueModal from "@/components/CreateQueueModal";
import EnterQueueModal from "@/components/EnterQueueModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Queue } from "@/models/queue";
import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { handleError } from "@/utils/utils";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user } = useAuthenticatedUser();
  const router = useRouter();
  const [queues, setQueues] = useState<Queue[]>([]);

  function isRecepcionista() {
    console.log(user);
    return user?.userType === UserType.recepcionista;
  }

  useEffect(() => {
    async function getQueuesByUser() {
      try {
        if (!user) throw Error("Não logado");
        const queues = isRecepcionista()
          ? await QueuesApi.getQueuesRecepcionista(user.clinicDocument ?? "")
          : await QueuesApi.getQueuesByUser(user._id);
        setQueues(queues);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }
    getQueuesByUser();
  }, []);
  return (
    <Container
      component="main"
      style={{
        backgroundColor: "#FFF7D3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      HOME PAGE AFTER LOGIN
      {!isRecepcionista() && user && <EnterQueueModal userId={user._id} />}
      {isRecepcionista() && user && (
        <CreateQueueModal clinicDocument={user.clinicDocument ?? ""} />
      )}
      {queues.map((queue) => (
        <Link key={queue.code} href={`/queue/${queue.code}`}>
          Fila {queue.code}
        </Link>
      ))}
      {user?._id}
      {user?.cpf}
      {user?.email}
      {user?.name}
    </Container>
  );
}
