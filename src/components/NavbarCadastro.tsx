import { AppBar, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";

const buttonStyle = {
  borderRadius: 20,
  margin: "0 8px",
};

const NavbarCadastro: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/telaCadastroPaciente" passHref>
          <Button component="a" color="inherit" style={buttonStyle}>
            Cadastrar como Paciente
          </Button>
        </Link>
        <Link href="/telaCadastroMedico" passHref>
          <Button component="a" color="inherit" style={buttonStyle}>
            Cadastrar como Médico
          </Button>
        </Link>
        <Link href="/telaCadastroRecepcionista" passHref>
          <Button component="a" color="inherit" style={buttonStyle}>
            Cadastrar como Recepcionista
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarCadastro;
