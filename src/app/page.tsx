"use client";

import FormInputField from "@/components/FormInputField";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as UsersApi from "@/network/api/user";
import { LoginCredentials } from "@/network/api/user";
import { UnauthorizedError } from "@/network/http-errors";
import { handleError } from "@/utils/utils";
import { Alert, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    <Container
      component="main"
      style={{
        backgroundColor: "#FFF7D3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {errorText && <Alert>{errorText}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <FormInputField
            register={register("username", { required: "CPF é obrigatório" })}
            label="Cpf:"
            formError={errors.username}
            style={{ backgroundColor: "#5889DC", borderRadius: "20px" }}
            required
            fullWidth
            autoFocus
          />

          <FormInputField
            register={register("password", { required: "Senha é obrigatória" })}
            label="Senha:"
            formError={errors.password}
            style={{ backgroundColor: "#9AD3BC", borderRadius: "20px" }}
            required
            fullWidth
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "4rem auto 1rem", borderRadius: "20px" }}
          >
            Entrar
          </Button>

          <Typography
            variant="body2"
            align="center"
            style={{ margin: "1rem 0" }}
          >
            É novo cliente? Cadastre-se clicando{" "}
            <Link
              href="/signUp"
              passHref
              style={{ textDecoration: "underline" }}
            >
              aqui
            </Link>
          </Typography>
        </div>
      </form>
    </Container>
  );
}
