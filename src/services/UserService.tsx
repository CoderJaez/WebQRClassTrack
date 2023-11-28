import { useState } from "react";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import { UserInfo, Response } from "types";

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
  const logout = async () => {
    return await new Promise<Response>((resolve, reject) => {
      axios
        .get("auth/logout")
        .then((res) => {
          const message = {
            status: res.status,
            message: res.data.message,
          } as Response;
          resolve(message);
        })
        .catch((err) => {
          console.error("Error: ", err);
          const message = {
            status: err.status,
            message: err.response.data.message,
          } as Response;
          reject(message);
          
        });
    });
  };
  const updateUser = async (
    id: string,
    values: Omit<UserInfo, "_id" | "image" | "password">,
  ) => {
    setLoading(true);
    return await new Promise<Response>((resolve, reject) => {
      axios
        .put(`users/${id}`, values)
        .then((res) => {
          const result = {
            status: res.status,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) => {
          const result = {
            status: err.response.status,
            message: err.response.data.message,
          };
          reject(result);
        })
        .finally(() => setLoading(false));
    });
  };

  const addUser = async (
    values: Omit<UserInfo, "_id" | "image" | "password">,
  ) => {
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

  const removeUser = async (id: string) => {
    setLoading(true);
    return await new Promise<Response>((resolve, reject) => {
      axios
        .delete(`users/${id}`)
        .then((res) => {
          const result = {
            status: res.status,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) => {
          const result = {
            status: err.response.status,
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
    updateUser,
    removeUser,
    logout,
  };
};

export default useUser;
