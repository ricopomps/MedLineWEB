"use client";

import CreateQueueModal from "@/components/CreateQueueModal";
import EnterQueueModal from "@/components/EnterQueueModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { Queue } from "@/models/queue";
import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { handleError } from "@/utils/utils";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Container, Divider, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const theme = useTheme();

  return (
    <Container
      component="main"
      style={{
        backgroundColor: "#FFF7D3",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        height={theme.spacing(9)}
        marginX={1}
        padding={0.5}
        paddingX={7}
        display="flex"
        gap={1}
        alignItems="center"
      >
        <Typography variant="h2" fontFamily="sans-serif">
          <strong>Página do paciente</strong>
        </Typography>
      </Box>

      {user && user?.userType === UserType.patient && (
        <EnterQueueModal userId={user._id} />
      )}
      {isRecepcionista && user && (
        <CreateQueueModal clinicDocument={user.clinicDocument?.[0] ?? ""} />
      )}

      <Box marginTop={10}>
        <Typography variant="h4">
          {queues.map((queue) => (
            <>
              Codigos de filas cadastradas:
              <Typography color="blue" variant="h5">
                <Link key={queue.code} href={`/queue/${queue.code}`}>
                  {queue.code}
                </Link>
              </Typography>
            </>
          ))}
        </Typography>
      </Box>

      <Box marginBottom={14} marginTop={13}>
        Dados do paciente:
        <Box padding={1} display="flex">
          <Typography variant="h6">
            <PersonIcon />
            Nome: {user?.name}
          </Typography>
        </Box>
        <Divider />
        <Box padding={1} display="flex">
          <Typography variant="h6">
            <EmailIcon />
            E-mail: {user?.email}
          </Typography>
        </Box>
        <Divider />
        <Box padding={1} display="flex">
          <Typography variant="h6">
            <BadgeIcon /> CPF: {user?.cpf}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
