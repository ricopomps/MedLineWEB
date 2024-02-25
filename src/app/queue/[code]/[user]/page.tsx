"use client";
import { User } from "@/models/user";
import * as UsersApi from "@/network/api/user";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Container, Divider, IconButton, Link, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserContext } from "@/context/UserProvider";

interface UserDetailQueuePageProps {
  params: {
    code: string;
    user: string;
  };
}

export default function UserDetailQueuePage({
  params: { code, user: userId },
}: UserDetailQueuePageProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const { queues } = useContext(UserContext);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const userResponse = await UsersApi.getUser(userId);
        setUser(userResponse);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading)
    return (
      <Container
        component="main"
        style={{
          backgroundColor: "#FFF7D3",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>Caregando...</div>
      </Container>
    );

  if (!loading && !user)
    return (
      <Container
        component="main"
        style={{
          backgroundColor: "#FFF7D3",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>Usuário não encontrado</div>
      </Container>
    );

  const selectedQueue = queues.find(queue => queue.code === code);

  return (
    <Container
      component="main"
      style={{
        backgroundColor: "#FFF7D3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {selectedQueue && (
          <Box marginTop={1}>
            <Link href={`/queue/${selectedQueue.code}`}>
              <IconButton aria-label="back" size="large">
                <ArrowBackIcon /> voltar
              </IconButton>
            </Link>
          </Box>
        )}
      </div>
      
      <Box marginBottom={8}>
        <Typography variant="h4">
          <strong>Código da fila:</strong> {code}
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
