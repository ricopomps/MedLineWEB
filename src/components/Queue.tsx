"use client";

import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Queue } from "@/models/queue";
import * as QueuesApi from "@/network/api/queue";
import { handleError } from "@/utils/utils";
import { Button } from "@mui/material";

interface QueueProps {
  queue: Queue;
}

export default function Queue({ queue }: QueueProps) {
  const { user } = useAuthenticatedUser();

  function isUserInQueue() {
    console.log(user);
    if (user && queue.users.includes(user._id)) {
      return true;
    }
    return false;
  }

  function getPositionInQueue() {
    if (!user) return;
    const userIndex = queue.users.findIndex((u) => u === user._id);
    return userIndex + 1;
  }

  function getTimeInQueue() {
    const position = getPositionInQueue();
    const medianTime = 15;
    if (position) return position * medianTime;
  }

  async function enterQueue() {
    try {
      if (!user) throw Error("Não logado");
      await QueuesApi.enterQueue(queue.code, user._id);
    } catch (error) {
      console.log(error);

      handleError(error);
    }
  }

  return (
    <div>
      {" "}
      {isUserInQueue() ? (
        <>
          <h2 style={{ color: "black" }}>
            Sua posição na fila de espera é: {getPositionInQueue()}
          </h2>
          <h2 style={{ color: "black" }}>
            Tempo estimado para ser atendido: {getTimeInQueue()} minutos
          </h2>
        </>
      ) : (
        <>
          Você não está nessa fila
          <Button onClick={() => enterQueue()}>entrar</Button>
        </>
      )}
    </div>
  );
}
