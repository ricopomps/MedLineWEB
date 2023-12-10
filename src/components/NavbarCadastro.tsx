// components/NavbarCadastro.tsx
import React from "react";
import { Button, Toolbar, AppBar } from "@mui/material";
import NextLink from "next/link";

const NavbarCadastro: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/telaCadastroPaciente" passHref>
          <Button component="a" color="inherit">
            Cadastrar como Paciente
          </Button>
        </NextLink>
        <NextLink href="/telaCadastroMedico" passHref>
          <Button component="a" color="inherit">
            Cadastrar como Médico
          </Button>
        </NextLink>
        <NextLink href="/telaCadastroRecepcionista" passHref>
          <Button component="a" color="inherit">
            Cadastrar como Recepcionista
          </Button>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarCadastro;
