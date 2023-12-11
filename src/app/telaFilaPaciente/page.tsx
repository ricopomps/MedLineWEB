import Link from "next/link";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import mediline from "../../../public/mediline.svg";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function telaFilaPaciente() {
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
        <Link href="/">
          <IconButton aria-label="back" size="large">
            voltar
            {/* <ArrowBackIcon /> */}
          </IconButton>
        </Link>
      </div>
      <Image src={mediline} alt="mediline" width={500} height={300}></Image>
      <h2 style={{ color: "black" }}>Sua posição na fila de espera é:</h2>
      <h2 style={{ color: "black" }}>Tempo estimado para ser atendido:</h2>
    </Container>
  );
}
