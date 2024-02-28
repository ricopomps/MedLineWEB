"use client";

import * as UsersApi from "@/network/api/user";
import { UserType } from "@/network/api/user";
import { TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import FormInputField, { FormInputFieldProps } from "./FormInputField";

type UserSelector = FormInputFieldProps &
  TextFieldProps & {
    userType?: UserType;
    clinicDocument?: string;
  };

export default function UserSelector({
  userType,
  clinicDocument,
  ...props
}: UserSelector) {
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        if (clinicDocument) {
          const users = await UsersApi.getStaff(clinicDocument);
          setOptions(
            users
              ?.filter((user) => user.userType === UserType.doctor)
              .map((user) => ({
                label: user.name,
                value: user._id,
              }))
          );
        } else {
          const users = await UsersApi.getUsers(userType);
          setOptions(
            users?.map((user) => ({
              label: user.name,
              value: user._id,
            }))
          );
        }
      } catch (error) {
        return [];
      }
    }
    getUsers();
  }, [userType, clinicDocument]);

  return <FormInputField {...props} options={options} />;
}
