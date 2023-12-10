import React from "react";
import { Button, TextField, Typography, Link, Container } from "@mui/material";
import NavbarCadastro from "@/components/NavbarCadastro";

export default function TelaCadastroPaciente() {
  return (
    <Container component="main" maxWidth="xs">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
        <Typography variant="h5" gutterBottom>
          MedLine
        </Typography>
        <div style={{marginTop: "3rem"}}/>
        <NavbarCadastro/>
        <div style={{marginTop: "3rem"}}/>
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
        </form>
      </div>
    </Container>
  );
}
