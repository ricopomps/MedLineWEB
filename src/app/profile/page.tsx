"use client";

import styles from "@/app/page.module.css";
import * as UsersApi from "@/network/api/user";
import { Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Profile() {
  const [message, setMessage] = useState("sem mensagem");
  const [open, setOpen] = useState(false);
  async function getMessage() {
    try {
      const data = await UsersApi.getMessage();
      setMessage(data.message);
    } catch (error) {}
  }

  return (
    <main className={styles.main}>
      <div>Profile</div>
      <div>{message}</div>
      <Button
        variant="contained"
        onClick={() => {
          getMessage();
          setOpen(true);
        }}
      >
        Get Message
      </Button>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
