"use client";

import FormInputField from "@/components/FormInputField";
import { UserContext } from "@/context/UserProvider";
import { handleError } from "@/utils/utils";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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

interface EnterQueueForm {
  code: string;
}

interface EnterQueueModalProps {
  userId: string;
}

export default function EnterQueueModal({ userId }: EnterQueueModalProps) {
  const router = useRouter();
  const { enterQueue } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function onSubmit(credentials: EnterQueueForm) {
    try {
      enterQueue(credentials.code, userId);
      toast.success("Entrou na fila");
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
      <Box marginTop={5}>
        <Button variant="contained" onClick={handleOpen}>
          <Typography display="flex" alignItems="center">
            Entrar numa fila <AddIcon />
          </Typography>
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.modal}>
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
        </Box>
      </Modal>
    </div>
  );
}
