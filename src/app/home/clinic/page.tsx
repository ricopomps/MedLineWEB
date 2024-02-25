"use client";

import AddStaffModal from "@/components/AddStaffModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { User } from "@/models/user";
import * as UsersApi from "@/network/api/user";
import { UserType } from "@/network/api/user";
import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function ClinicPage() {
  const { user } = useAuthenticatedUser();
  const [clinicStaff, setClinicStaff] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasAccess =
    user && user?.userType === UserType.recepcionista && user.clinicDocument;

  useEffect(() => {
    if (hasAccess) {
      const getStaff = async () => {
        try {
          setIsLoading(true);

          const staff = await UsersApi.getStaff(user.clinicDocument!);
          setClinicStaff(staff);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      };
      getStaff();
    }
  }, [hasAccess, user]);

  if (!hasAccess) {
    return <div>No access</div>;
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
      <div>
        {isLoading && <CircularProgress />}
        {clinicStaff.map((staff) => (
          <div key={staff._id}>
            {staff.name} - {staff.userType}
          </div>
        ))}
      </div>
      <AddStaffModal clinicDocument={user.clinicDocument ?? ""} />
    </Container>
  );
}
