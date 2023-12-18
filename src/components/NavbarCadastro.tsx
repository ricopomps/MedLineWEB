"use client";
import { UserType } from "@/network/api/user";
import { AppBar, Button, Toolbar } from "@mui/material";
import styles from "./NavbarCadastro.module.css";

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
    <AppBar className={styles.appbar} position="static">
      <Toolbar>
        <Button
          className={
            userType == UserType.pacient ? styles.selectedButton : styles.button
          }
          component="a"
          onClick={() => setUserType(UserType.pacient)}
          color="inherit"
        >
          Cadastrar como Paciente
        </Button>
        <Button
          className={
            userType == UserType.doctor ? styles.selectedButton : styles.button
          }
          component="a"
          color="inherit"
          onClick={() => setUserType(UserType.doctor)}
        >
          Cadastrar como Médico
        </Button>
        <Button
          className={
            userType == UserType.recepcionista
              ? styles.selectedButton
              : styles.button
          }
          onClick={() => setUserType(UserType.recepcionista)}
          component="a"
          color="inherit"
        >
          Cadastrar como Recepcionista
        </Button>
      </Toolbar>
    </AppBar>
  );
}
