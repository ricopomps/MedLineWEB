"use client";

import * as UsersApi from "@/network/api/user";
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

interface AddStaffForm {
  doctorId: string;
}

interface AddStaffModalProps {
  clinicDocument: string;
}

export default function AddStaffModal({ clinicDocument }: AddStaffModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function onSubmit(credentials: AddStaffForm) {
    try {
      const queue = await UsersApi.addStaff(
        credentials.doctorId,
        clinicDocument
      );
      toast.success("Membro de equipe adicionado");
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStaffForm>();
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Adicionar membro de equipe
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar membro de equipe
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
