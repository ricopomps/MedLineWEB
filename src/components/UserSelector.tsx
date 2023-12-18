"use client";

import * as UsersApi from "@/network/api/user";
import { UserType } from "@/network/api/user";
import { TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import FormInputField, { FormInputFieldProps } from "./FormInputField";

type UserSelector = FormInputFieldProps &
  TextFieldProps & {
    userType?: UserType;
  };

export default function UserSelector({ userType, ...props }: UserSelector) {
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const users = await UsersApi.getUsers(userType);
        setOptions(
          users?.map((user) => ({
            label: user.name,
            value: user._id,
          }))
        );
      } catch (error) {
        return [];
      }
    }
    getUsers();
  }, [userType]);

  return <FormInputField {...props} options={options} />;
}
