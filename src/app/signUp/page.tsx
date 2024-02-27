"use client";

import FormInputField from "@/components/FormInputField";
import NavbarCadastro from "@/components/NavbarCadastro";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useCountdown from "@/hooks/useCountdown";
import * as UsersApi from "@/network/api/user";
import { UserType } from "@/network/api/user";
import { ConflictError, UnauthorizedError } from "@/network/http-errors";
import { getUserTypeName, handleError } from "@/utils/utils";
import { Alert, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./signUpPage.module.css";

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
  const [userType, setUserType] = useState<UserType>(UserType.patient);
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
    <Container className={styles.container} component="main" maxWidth="xs">
      <div className={styles.main}>
        <Image
          src="/images/medline_transparente.svg"
          alt="MedLine Logo"
          width={370}
          height={110}
        />
        <div />
        <h1
          style={{
            fontFamily: "Inter",
            fontSize: "22px",
            color: "#1976D2",
            marginBottom: "1rem",
          }}
        >
          {/* Eu sou: */}
        </h1>

        <NavbarCadastro userType={userType} setUserType={setUserType} />
        <div style={{ marginTop: "2rem" }} />
        <h1 className={styles.cadastrarText}>
          Cadastrar como {getUserTypeName(userType)}
        </h1>
        {errorText && <Alert severity="error">{errorText}</Alert>}
        {showVerificationCodeSentText && (
          <Alert>Um código de verificação foi enviado para seu e-mail</Alert>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", maxWidth: 400 }}
        >
          <FormInputField
            className={styles.inputField}
            register={register("name", { required: "Nome é obrigatório" })}
            placeholder="Nome"
            formError={errors.name}
            required
            fullWidth
            autoFocus
          />
          <FormInputField
            className={styles.inputField}
            register={register("cpf", { required: "CPF é obrigatório" })}
            placeholder="CPF"
            formError={errors.cpf}
            required
            fullWidth
          />
          <FormInputField
            className={styles.inputField}
            register={register("email", { required: "E-Mail é obrigatório" })}
            placeholder="E-mail"
            formError={errors.email}
            required
            fullWidth
            inputGroupElement={
              <Button
                className={styles.button}
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
            className={styles.inputField}
            register={register("verificationCode", {
              required: "Código de verificação é obrigatório",
            })}
            placeholder="Código de verificação"
            formError={errors.verificationCode}
            required
            fullWidth
          />
          <FormInputField
            className={styles.inputField}
            register={register("password", { required: "Senha é obrigatório" })}
            placeholder="Senha"
            formError={errors.password}
            required
            type="password"
            fullWidth
          />
          <FormInputField
            className={styles.inputField}
            register={register("confirmPassword", {
              required: "Senha é obrigatório",
            })}
            placeholder="Confirmar senha"
            formError={errors.confirmPassword}
            required
            type="password"
            fullWidth
          />
          {userType === UserType.recepcionista && (
            <FormInputField
              className={styles.inputField}
              register={register("clinicDocument", {
                required: "Documento da clinica é obrigatório",
              })}
              placeholder="Documento da clinica:"
              formError={errors.clinicDocument}
              required
              fullWidth
            />
          )}
          <Button
            className={styles.buttonSubmit}
            type="submit"
            fullWidth
            variant="contained"
          >
            Cadastrar
          </Button>
          <Link href="/" passHref>
            <Button
              className={styles.buttonSubmit}
              fullWidth
              variant="contained"
            >
              Voltar para o login
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
