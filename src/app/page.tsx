import { Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h2" gutterBottom>
          MedLine
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuário"
          name="username"
          autoComplete="username"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          variant="contained"
          color="primary"
          style={{ margin: "1rem 0" }}
        >
          Entrar
        </Button>

        <Typography variant="body2" align="center" style={{ margin: "1rem 0" }}>
          É novo cliente? Cadastre-se clicando{" "}
          <Link
            href="/telaCadastroPaciente"
            passHref
            style={{ textDecoration: "underline" }}
          >
            aqui
          </Link>
        </Typography>
      </div>
    </Container>
  );
}
