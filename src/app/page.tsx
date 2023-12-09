import React from "react";
import { Button, Typography, Link, Container } from "@mui/material";
import NextLink from "next/link";

export default function Home() {
  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: "#fff", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
        <Typography variant="h4" gutterBottom>
          MedLine
        </Typography>

        <NextLink href="/telaLoginPaciente" passHref>
          <Button
            component="a"
            variant="contained"
            color="primary"
            style={{ marginTop: "2rem" }}
          >
            Entrar como Paciente
          </Button>
        </NextLink>

        <NextLink href="/telaLoginMedico" passHref>
          <Button
            component="a"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Entrar como Médico
          </Button>
        </NextLink>

        <NextLink href="/telaLoginRecepcionista" passHref>
          <Button
            component="a"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Entrar como Recepcionista
          </Button>
        </NextLink>

        <Typography variant="body2" align="center" style={{ marginTop: "2rem" }}>
          Novo por aqui?{" "}
          <NextLink href="/cadastrarNovoUsuario" passHref>
            <Link variant="body2">
              Cadastre-se clicando aqui
            </Link>
          </NextLink>
        </Typography>
      </div>
    </Container>
  );
}
