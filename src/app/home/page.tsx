"use client";

import CreateQueueModal from "@/components/CreateQueueModal";
import EnterQueueModal from "@/components/EnterQueueModal";
import { UserContext } from "@/context/UserProvider";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { UserType } from "@/network/api/user";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Container, Divider, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";

export default function HomePage() {
  const { user } = useAuthenticatedUser();
  const { queues } = useContext(UserContext);

  const isRecepcionista = user?.userType === UserType.recepcionista;

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

        {user && user?.userType === UserType.patient && (
          <Typography variant="h2" fontFamily="sans-serif">
            <strong>Página do paciente</strong>
          </Typography>
        )}

        {user && user?.userType === UserType.doctor && (
          <Typography variant="h2" fontFamily="sans-serif">
            <strong>Página do Medico</strong>
          </Typography>
        )}

        {user && user?.userType === UserType.recepcionista && (
          <Typography variant="h2" fontFamily="sans-serif">
            <strong>Página do Recepcionista</strong>
          </Typography>
        )}

      </Box>

      {user && user?.userType === UserType.patient && (
        <EnterQueueModal userId={user._id} />
      )}
      {isRecepcionista && user && (
        <CreateQueueModal clinicDocument={user.clinicDocument?.[0] ?? ""} />
      )}

      {user && user?.userType === UserType.patient && (
        <Box marginTop={10}>
          <Typography variant="h4">
             Filas que você está cadastrado(a):
            {queues.map((queue) => (
              <div key={queue.code}>
                <Typography color="blue" variant="h5">
                  <Link key={queue.code} href={`/queue/${queue.code}`}>
                    {queue.code}
                  </Link>
                </Typography>
              </div>
            ))}
          </Typography>
        </Box>
      )}


      {user && user?.userType === UserType.recepcionista && (
        <Box marginTop={10}>
          <Typography variant="h4">
            Filas criadas para atendimento:
            {queues.map((queue) => (
              <div key={queue.code}>
                <Typography color="blue" variant="h5">
                  <Link key={queue.code} href={`/queue/${queue.code}`}>
                    {queue.code}
                  </Link>
                </Typography>
              </div>
            ))}
          </Typography>
        </Box>
      )}


      {user && user?.userType === UserType.doctor && (
        <Box marginTop={10}>
          <Typography variant="h4">
            Fila(s) com pacientes a serem atendidos:
            {queues.map((queue) => (
              <div key={queue.code}>
                <Typography color="blue" variant="h5">
                  <Link key={queue.code} href={`/queue/${queue.code}`}>
                    {queue.code}
                  </Link>
                </Typography>
              </div>
            ))}
          </Typography>
        </Box>
      )}

      {/* -------------------------------Dados dos tipos de usuario------------------------------- */}
      {user && user?.userType === UserType.patient && (
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
      )}

      {user && user?.userType === UserType.doctor && (
        <Box marginBottom={14} marginTop={13}>
          Dados do Medico:
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
      )}

      {user && user?.userType === UserType.recepcionista && (
        <Box marginBottom={14} marginTop={13}>
          Dados do recepcionista:
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
      )}

    </Container>
  );
}
