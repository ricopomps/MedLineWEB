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
import medLineImagem from "../../app/mediline.svg";
import styles from "./homePage.module.css";
import Image from "next/image";

export default function HomePage() {
  const { user } = useAuthenticatedUser();
  const router = useRouter();
  const [queues, setQueues] = useState<Queue[]>([]);

  const isRecepcionista = user?.userType === UserType.recepcionista;
  const isDoctor = user?.userType === UserType.doctor;

  useEffect(() => {
    async function getQueuesByUser() {
      if (!user) return;
      try {
        const queues = isRecepcionista
          ? await QueuesApi.getQueuesRecepcionista(user.clinicDocument ?? "")
          : isDoctor
          ? await QueuesApi.getQueuesDoctor(user._id)
          : await QueuesApi.getQueuesByUser(user._id);
        setQueues(queues);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }
    getQueuesByUser();
  }, [user, isRecepcionista, isDoctor]);

  return (
    <Container component="main" className={styles.container}>
      <Image
        className={styles.logo}
        src={medLineImagem}
        alt="Descrição da imagem"
        width={300}
        height={200}
      />
      HOME PAGE AFTER LOGIN
      <div className={styles.button}>
        {user && user?.userType === UserType.patient && (
          <EnterQueueModal userId={user._id} />
        )}
      </div>
      {isRecepcionista && user && (
        <CreateQueueModal clinicDocument={user.clinicDocument?.[0] ?? ""} />
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
