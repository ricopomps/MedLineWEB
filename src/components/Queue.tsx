"use client";

import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Queue } from "@/models/queue";
import { User } from "@/models/user";
import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { handleError } from "@/utils/utils";
import { Box, Button, Divider, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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

  const theme = useTheme();
  return (
    <div>
      {user && <MedicVision currentUser={user} queue={queue} />}
      {user?.userType === UserType.patient && (
        <>
          {isUserInQueue() ? (
            <>
              <Box sx={{ height: theme.spacing(6)}} display="flex" alignItems="center" justifyContent="center">  
                <h2 style={{ color: "black" }}>
                  <ArrowRightIcon /> Sua posição na fila de espera é: {getPositionInQueue()}
                </h2>
              </Box>

              <Divider />

              <Box flex={1}>
                <h2 style={{ color: "black" }}>
                  <ArrowRightIcon /> Tempo estimado para ser atendido: {getTimeInQueue()} minutos
                </h2>
              </Box>
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

interface MedicVisionProps {
  queue: Queue;
  currentUser: User;
}

function MedicVision({ currentUser, queue }: MedicVisionProps) {
  const router = useRouter();
  if (currentUser.userType !== UserType.doctor) return null;

  async function endAppointment() {
    try {
      await QueuesApi.endAppointment(queue._id);
      router.refresh();
    } catch (error) {}
  }

  return (
    <div>
      {queue.users && queue.users.length > 0 ? (
        <div>
          <div>Usuario atual: {queue.users[0].name}</div>
          <Button color="error" onClick={endAppointment}>
            Encerrar
          </Button>
        </div>
      ) : (
        <p>Não há usuarios nessa fila</p>
      )}
    </div>
  );
}
