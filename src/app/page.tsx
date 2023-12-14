import { Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Container
      component="main"
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
          alignItems: "flex-start",
          marginTop: "1rem",
        }}
      >
        <div style={{ marginTop: "-20px" }}>
          <Image
            src="/images/titulo_MedLine.png"
            alt="MedLine Logo"
            width={435}
            height={140}
          />
        </div>

        <div style={{ width: "100%", marginBottom: "2rem", marginTop: "2rem" }}>
          <Typography variant="h6" gutterBottom>
            Cpf:
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="cpf"
            name="cpf"
            autoComplete="cpf"
            autoFocus
            style={{ backgroundColor: "#5889DC", borderRadius: "20px" }}
          />
        </div>

        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            Senha:
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{ backgroundColor: "#9AD3BC", borderRadius: "20px" }}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ margin: "4rem auto 1rem", borderRadius: "20px" }}
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
