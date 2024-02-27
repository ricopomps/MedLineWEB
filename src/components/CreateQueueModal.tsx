"use client";

import * as QueuesApi from "@/network/api/queue";
import { UserType } from "@/network/api/user";
import { handleError } from "@/utils/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UserSelector from "./UserSelector";
import styles from "./AddStaffModal.module.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "#024e99",
  bgcolor: "#dbdbdb",
  boxShadow: 24,
  p: 4,
};

interface CreateQueueForm {
  doctorId: string;
}

interface CreateQueueModalProps {
  clinicDocument: string;
}

export default function CreateQueueModal({
  clinicDocument,
}: CreateQueueModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function onSubmit(credentials: CreateQueueForm) {
    try {
      const queue = await QueuesApi.createQueue(
        credentials.doctorId,
        clinicDocument
      );
      toast.success("Fila criada");
      router.push(`/queue/${queue.code}`);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQueueForm>();
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Criar uma fila
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Criar uma fila
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <UserSelector
              register={register("doctorId", {
                required: "Médico obrigatório",
              })}
              label="Selecione o médico:"
              formError={errors.doctorId}
              style={{ backgroundColor: "#5889DC" }}
              required
              fullWidth
              autoFocus
              userType={UserType.doctor}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "20px" }}
            >
              Criar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
