"use client";

import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Queue } from "@/models/queue";
import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { handleError } from "@/utils/utils";
import { Button } from "@mui/material";

interface QueueProps {
  queue: Queue;
}

export default function Queue({ queue }: QueueProps) {
  const { user } = useAuthenticatedUser();

  function isUserInQueue() {
    console.log(user);
    if (user && queue.users.map((user) => user._id).includes(user._id)) {
      return true;
    }
    return false;
  }

  function getPositionInQueue() {
    if (!user) return;
    const userIndex = queue.users.findIndex((u) => u._id === user._id);
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

  async function removeUserFromQueue(userId: string) {
    await QueuesApi.removeFromQueue(queue.code, userId);
    console.log(queue);
  }

  return (
    <div>
      {user?.userType === UserType.patient && (
        <>
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
        </>
      )}
      {user?.userType === UserType.recepcionista &&
        queue?.users &&
        queue.users.map((user, index) => (
          <>
            {index + 1} - {user.name}
            <Button color="error" onClick={() => removeUserFromQueue(user._id)}>
              Remover
            </Button>
          </>
        ))}
    </div>
  );
}
