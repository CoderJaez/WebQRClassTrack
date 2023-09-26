import React, { useState } from "react";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import { UserInfo, Response } from "types";
import { resolve } from "path";
import { rejects } from "assert";

interface UserResponse extends Response {
  user: UserInfo | null;
}

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();

  const getUsers = async (search: string) => {
    return await new Promise<UserInfo[]>((resolve, reject) => {
      axios
        .get(`users?search=${search}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("Error:", err);
          reject([]);
        });
    });
  };

  const addUser = async (values: Omit<UserInfo, "id" | "image_path">) => {
    setLoading(true);
    const value = { ...values, ...{ role: values.role.toLowerCase() } };
    return await new Promise<UserResponse>((resolve, reject) => {
      axios
        .post("users", value)
        .then((res) => {
          const result: UserResponse = {
            status: res.status,
            user: res.data.data,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) => {
          const result: UserResponse = {
            status: err.response.status,
            user: null,
            message: err.response.data.message,
          };
          reject(result);
        })
        .finally(() => setLoading(false));
    });
  };

  return {
    loading,
    addUser,
    getUsers,
  };
};

export default useUser;
