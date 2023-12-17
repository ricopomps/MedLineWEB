"use client";

import FormInputField from "@/components/FormInputField";
import NavbarCadastro from "@/components/NavbarCadastro";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useCountdown from "@/hooks/useCountdown";
import * as UsersApi from "@/network/api/user";
import { UserType } from "@/network/api/user";
import { ConflictError, UnauthorizedError } from "@/network/http-errors";
import { getUserTypeName, handleError } from "@/utils/utils";
import { Alert, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface SignUpFormData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  clinicDocument?: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const { mutateUser } = useAuthenticatedUser();

  const [verificationCodeRequestPending, setVerificationCodeRequestPending] =
    useState(false);
  const [showVerificationCodeSentText, setShowVerificationCodeSentText] =
    useState(false);

  const [errorText, setErrorText] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(UserType.pacient);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const {
    secondsLeft: verificationCodeCooldownSecondsLeft,
    start: startVerificationCodeCooldown,
  } = useCountdown();

  async function requestVerificationCode() {
    const validEmailInput = await trigger("email");
    if (!validEmailInput) return;
    const emailInput = getValues("email");
    setErrorText(null);
    setShowVerificationCodeSentText(false);
    setVerificationCodeRequestPending(true);
    try {
      await UsersApi.requestEmailVerificationCode(emailInput);
      setShowVerificationCodeSentText(true);
      startVerificationCodeCooldown(60);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        handleError(error);
      }
    } finally {
      setVerificationCodeRequestPending(false);
    }
  }

  async function onSubmit(credentials: SignUpFormData) {
    try {
      setErrorText(null);
      if (credentials.password != credentials.confirmPassword)
        throw Error("Senhas precisam ser iguais");
      if (userType !== UserType.recepcionista)
        delete credentials.clinicDocument;
      const newUser = await UsersApi.signUp({ ...credentials, userType });
      mutateUser(newUser);
      toast.success("Sign In successful");
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
      style={{
        backgroundColor: "#FFF7D3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="main"
      maxWidth="xs"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h5" gutterBottom>
          MedLine
        </Typography>
        <div style={{ marginTop: "3rem" }} />
        <NavbarCadastro userType={userType} setUserType={setUserType} />
        <div style={{ marginTop: "3rem" }} />
        <h1>Cadastrar como {getUserTypeName(userType)}</h1>
        {errorText && <Alert>{errorText}</Alert>}
        {showVerificationCodeSentText && (
          <Alert>
            We sent you a verification code, please check your inbox
          </Alert>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", maxWidth: 400, marginTop: "1rem" }}
        >
          <FormInputField
            register={register("name", { required: "Nome é obrigatório" })}
            label="Nome:"
            formError={errors.name}
            required
            fullWidth
            autoFocus
          />
          <FormInputField
            register={register("cpf", { required: "CPF é obrigatório" })}
            label="Cpf:"
            formError={errors.cpf}
            required
            fullWidth
          />
          <FormInputField
            register={register("email", { required: "E-Mail é obrigatório" })}
            label="E-Mail:"
            formError={errors.email}
            required
            fullWidth
            inputGroupElement={
              <Button
                id="button-send-verification-code"
                disabled={
                  verificationCodeRequestPending ||
                  verificationCodeCooldownSecondsLeft > 0
                }
                onClick={requestVerificationCode}
              >
                Send code
                {verificationCodeCooldownSecondsLeft > 0 &&
                  `(${verificationCodeCooldownSecondsLeft})`}
              </Button>
            }
          />
          <FormInputField
            register={register("verificationCode", {
              required: "Código de verificação é obrigatório",
            })}
            label="Código de verificação:"
            formError={errors.verificationCode}
            required
            fullWidth
          />
          <FormInputField
            register={register("password", { required: "Senha é obrigatório" })}
            label="Senha:"
            formError={errors.password}
            required
            type="password"
            fullWidth
          />
          <FormInputField
            register={register("confirmPassword", {
              required: "Senha é obrigatório",
            })}
            label="confirmar senha:"
            formError={errors.confirmPassword}
            required
            type="password"
            fullWidth
          />
          {userType === UserType.recepcionista && (
            <FormInputField
              register={register("clinicDocument", {
                required: "Documento da clinica é obrigatório",
              })}
              label="Documento da clinica:"
              formError={errors.clinicDocument}
              required
              fullWidth
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "2rem" }}
          >
            Cadastrar
          </Button>
          <Link href="/" passHref>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
            >
              Voltar para o login
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
