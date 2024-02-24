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
      <h1 style={{ fontFamily: "Inter", fontSize: "22px", marginTop: "1rem" }}>
        Eu sou:{" "}
      </h1>
      <Toolbar className={styles.buttonWrapper}>
        <Button
          className={
            userType == UserType.patient ? styles.selectedButton : styles.button
          }
          component="a"
          onClick={() => setUserType(UserType.patient)}
          color="inherit"
        >
          Paciente
        </Button>
        <Button
          className={
            userType == UserType.doctor ? styles.selectedButton : styles.button
          }
          component="a"
          color="inherit"
          onClick={() => setUserType(UserType.doctor)}
        >
          Médico
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
          Recepcionista
        </Button>
      </Toolbar>
    </AppBar>
  );
}
