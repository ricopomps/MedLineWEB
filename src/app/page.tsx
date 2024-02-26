"use client";

import FormInputField from "@/components/FormInputField";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as UsersApi from "@/network/api/user";
import { LoginCredentials } from "@/network/api/user";
import { UnauthorizedError } from "@/network/http-errors";
import { handleError } from "@/utils/utils";
import { Alert, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./loginPage.module.css";

export default function Home() {
  const { mutateUser } = useAuthenticatedUser();
  const router = useRouter();
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      setErrorText(null);
      const newUser = await UsersApi.login(credentials);
      mutateUser(newUser);
      toast.success("Log In successful");
      router.push("/home");
    } catch (error) {
      console.log(error);
      if (error instanceof UnauthorizedError) {
        setErrorText("Invalid credentials"); //change passport js to send the message
      } else {
        handleError(error);
      }
    }
  }

  return (
    <Container className={styles.container} component="main">
      {errorText && <Alert severity="error">{errorText}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.main}>
          <div style={{ marginTop: "-20px" }}>
            <Image
              src="/images/medline_transparente.svg"
              alt="MedLine Logo"
              width={450}
              height={140}
            />
          </div>
          <FormInputField
            className={styles.inputField}
            register={register("username", { required: "CPF é obrigatório" })}
            formError={errors.username}
            placeholder="Usuário (CPF)"
            required
            fullWidth
            autoFocus
          />

          <FormInputField
            className={styles.inputField}
            register={register("password", { required: "Senha é obrigatória" })}
            formError={errors.password}
            placeholder="Senha"
            required
            fullWidth
            type="password"
          />

          <Button
            className={styles.buttonSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
          <span className={styles.newClient}>
            É novo cliente? Cadastre-se clicando{" "}
            <Link
              className={styles.link}
              href="/signUp"
              passHref
              style={{ textDecoration: "underline" }}
            >
              aqui
            </Link>
          </span>
        </div>
      </form>
    </Container>
  );
}
