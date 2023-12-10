import React from "react";
import { Button, TextField, Typography, Link, Container } from "@mui/material";
import NavbarCadastro from "@/components/NavbarCadastro";

export default function telaLoginRecepcionista() {
  return (
    <Container component="main" maxWidth="xs">
      <NavbarCadastro/>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
        <Typography variant="h4" gutterBottom>
          MedLine
        </Typography>
        
        <form style={{ width: "100%", maxWidth: 400, marginTop: "1rem" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="documentoRecepcionista"
          label="documentoRecepcionista"
          type="documentoRecepcionista"
          id="documentoRecepcionista">
            Documento do Médico
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "2rem" }}
          >
            Entrar
          </Button>
        </form>

        <Typography variant="body2" align="center" style={{ marginTop: "2rem" }}>
          Novo por aqui?{" "}
          <Link href="/cadastro" variant="body2">
            Cadastre-se clicando aqui
          </Link>
        </Typography>
      </div>
    </Container>
  );
}
