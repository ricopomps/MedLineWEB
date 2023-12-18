"use client";

import FormInputField from "@/components/FormInputField";
import * as QueuesApi from "@/network/api/queue";
import { handleError } from "@/utils/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "#5889DC",
  bgcolor: "#99ABCA",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EnterQueueForm {
  code: string;
}

interface EnterQueueModalProps {
  userId: string;
}

export default function EnterQueueModal({ userId }: EnterQueueModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function onSubmit(credentials: EnterQueueForm) {
    try {
      await QueuesApi.enterQueue(credentials.code, userId);
      toast.success("Entrou na fila");
      router.push(`/queue/${credentials.code}`);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterQueueForm>();
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Entrar numa fila
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Entrar na fila
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              register={register("code", { required: "Código é obrigatório" })}
              label="Digite o código:"
              formError={errors.code}
              style={{ backgroundColor: "#5889DC" }}
              required
              fullWidth
              autoFocus
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "20px" }}
            >
              Entrar
            </Button>
          </form>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
