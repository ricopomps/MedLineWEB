"use client";

import { Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function TelaCadastroPaciente() {
  return (
    <Container
      style={{
        backgroundColor: "#F0F0F0",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="main"
      maxWidth="xs"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h5" gutterBottom>
          MedLine
        </Typography>
        <div style={{ marginTop: "3rem" }} />
        {/* <NavbarCadastro /> */}
        <div style={{ marginTop: "3rem" }} />
        <h1>Cadastrar como Paciente</h1>

        <form style={{ width: "100%", maxWidth: 400, marginTop: "1rem" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="fullName"
            label="Nome completo"
            name="fullName"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Nome de usuário"
            name="username"
            autoComplete="username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            autoComplete="off"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirmar senha"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "2rem" }}
          >
            Cadastrar
          </Button>
          <Link href="/" passHref>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
            >
              Voltar para o login
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
