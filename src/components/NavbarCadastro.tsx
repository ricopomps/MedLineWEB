"use client";
import { UserType } from "@/network/api/user";
import { AppBar, Button, Toolbar } from "@mui/material";

const buttonStyle = {
  borderRadius: 20,
  margin: "0 8px",
};

const selectedButtonStyle = {
  borderRadius: 20,
  margin: "0 8px",
  backgroundColor: "#22346A",
};

interface NavbarCadastroProps {
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

export default function NavbarCadastro({
  userType,
  setUserType,
}: NavbarCadastroProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          component="a"
          onClick={() => setUserType(UserType.pacient)}
          color="inherit"
          style={
            userType == UserType.pacient ? selectedButtonStyle : buttonStyle
          }
        >
          Cadastrar como Paciente
        </Button>
        <Button
          component="a"
          color="inherit"
          onClick={() => setUserType(UserType.doctor)}
          style={
            userType == UserType.doctor ? selectedButtonStyle : buttonStyle
          }
        >
          Cadastrar como Médico
        </Button>
        <Button
          onClick={() => setUserType(UserType.recepcionista)}
          component="a"
          color="inherit"
          style={
            userType == UserType.recepcionista
              ? selectedButtonStyle
              : buttonStyle
          }
        >
          Cadastrar como Recepcionista
        </Button>
      </Toolbar>
    </AppBar>
  );
}
