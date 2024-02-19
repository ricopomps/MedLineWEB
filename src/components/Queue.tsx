"use client";

import { UserContext } from "@/context/UserProvider";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Queue, QueueStatus } from "@/models/queue";
import { User } from "@/models/user";
import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { handleError } from "@/utils/utils";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface QueueProps {
  queueId: string;
}

export default function Queue({ queueId }: QueueProps) {
  const { user } = useAuthenticatedUser();
  const { queues, setQueueWaiting } = useContext(UserContext);
  const [queue, setQueue] = useState(
    queues.find((queue) => queue._id === queueId)
  );

  useEffect(() => {
    setQueue(queues.find((queue) => queue._id === queueId));
  }, [queues, setQueue, queueId]);

  function isUserInQueue() {
    if (user && queue && queue.users.find((user) => user._id === user._id)) {
      return true;
    }
    return false;
  }

  function getPositionInQueue() {
    if (!user || !queue) return;
    const userIndex = queue.users.findIndex((u) => u._id === user._id);
    return userIndex;
  }

  function getTimeInQueue() {
    const position = getPositionInQueue();
    const medianTime = 15;
    if (position) return position * medianTime;
  }

  async function enterQueue() {
    try {
      if (!user || !queue) throw Error("Não logado");
      await QueuesApi.enterQueue(queue.code, user._id);
    } catch (error) {
      console.log(error);

      handleError(error);
    }
  }

  async function removeUserFromQueue(userId: string) {
    if (!queue) throw Error("Não encontrado fila");
    await QueuesApi.removeFromQueue(queue.code, userId);
  }

  const theme = useTheme();
  return (
    <div>
      {user && queue && <MedicVision currentUser={user} queue={queue} />}
      {user?.userType === UserType.patient && (
        <>
          {isUserInQueue() ? (
            <>
              <Box
                sx={{ height: theme.spacing(6) }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <h2 style={{ color: "black" }}>
                  <div style={{ display: "flex" }}>
                    <ArrowRightIcon />
                    {getPositionInQueue() === 0 ? (
                      <div>É sua vez no momento!</div>
                    ) : (
                      <div>
                        Quantidade de pacientes na sua frente: {getPositionInQueue()}
                      </div>
                    )}
                  </div>
                </h2>
              </Box>

              <Divider />

              {getPositionInQueue() !== 0 && (
                <Box flex={1}>
                  <h2 style={{ color: "black" }}>
                    <ArrowRightIcon /> Tempo estimado para ser atendido:{" "}
                    {getTimeInQueue()} minutos
                  </h2>
                </Box>
              )}
            </>
          ) : (
            <>
              Você não está nessa fila
              <Button onClick={() => enterQueue()}>entrar</Button>
            </>
          )}
        </>
      )}
      {user?.userType === UserType.recepcionista && queue?.users && (
        <>
          <Box padding={1} display="flex">
            <Typography variant="h6">Status: {queue.status}</Typography>
          </Box>
          <Box
            padding={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              disabled={queue.status !== QueueStatus.ready}
              onClick={() => setQueueWaiting(queue.code)}
            >
              Iniciar
            </Button>
          </Box>
          {queue.users.map((user, index) => (
            <div key={index}>
              {index + 1} - {user.name}
              <Button
                color="error"
                onClick={() => removeUserFromQueue(user._id)}
              >
                Remover
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

interface MedicVisionProps {
  queue: Queue;
  currentUser: User;
}

function MedicVision({ currentUser, queue }: MedicVisionProps) {
  const { setQueueReady, startAppointment, endAppointment } =
    useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  if (currentUser.userType !== UserType.doctor) return null;

  return (
    <div>
      <Box padding={1} display="flex">
        <Typography variant="h6">Status: {queue.status}</Typography>
      </Box>
      <Box padding={1} display="flex" gap={2}>
        <Button
          variant="contained"
          disabled={queue.status !== QueueStatus.waiting}
          onClick={() => startAppointment(queue.code)}
        >
          Receber paciente
        </Button>
        <Button
          variant="contained"
          disabled={queue.status !== QueueStatus.inProgress}
          onClick={() => endAppointment(queue.code)}
        >
          Encerrar consulta
        </Button>
        <Button
          variant="contained"
          disabled={queue.status !== QueueStatus.done}
          onClick={() => setQueueReady(queue.code)}
        >
          Pronto para próxima consulta
        </Button>
      </Box>

      {queue.status !== QueueStatus.done &&
      queue.status !== QueueStatus.ready ? (
        <>
          {queue.users && queue.users.length > 0 ? (
            <div>
              <div>
                Usuario atual:
                <Link href={`${pathname}/${queue.users[0]._id}`}>
                  <Box padding={1} display="flex">
                    <Typography variant="h6">
                      <PersonIcon />
                      Nome: {queue.users[0].name}
                    </Typography>
                  </Box>
                </Link>
              </div>
            </div>
          ) : (
            <p>Não há usuarios nessa fila</p>
          )}
        </>
      ) : (
        <>
          {queue.users &&
            queue.users.length > 0 &&
            queue.users.map((user) => (
              <div key={user._id}>
                <div>
                  <Link href={`${pathname}/${queue.users[0]._id}`}>
                    <Box padding={1} display="flex">
                      <Typography variant="h6">
                        <PersonIcon />
                        Nome: {queue.users[0].name}
                      </Typography>
                    </Box>
                  </Link>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
