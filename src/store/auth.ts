import { create } from "zustand";
import { UserInfo, Response } from "types";
import { persist, createJSONStorage } from "zustand/middleware";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import axios from "api/axios";
interface UserState {
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => Promise<Response>;
  setUser: (user: UserInfo) => void;
  setAccessToken: (token: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        _id: "",
        email: "",
        role: "",
        password: "",
        firstname: "",
        middlename: "",
        lastname: "",
        contact_no: "",
        image: null,
      },
      accessToken: "",
      refreshToken: "",
      login: async (email: string, password: string) => {
        return await new Promise<Response>((resolve, reject) => {
          axios
            .post("auth/login", {
              email: email,
              password: password,
            })
            .then((res) => {
              console.log(res.data.user);
              if (res.data.user.role == "admin") {
                const response: Response = {
                  status: res.status,
                  message: res.data.message,
                };
                // const user = { ...res.data.user, password: password };
                const user = res.data.user;
                set((state) => ({ ...state.user, user }));
                set(() => ({ accessToken: res.data.access_token }));
                set(() => ({ refreshToken: res.data.refresh_token }));
                resolve(response);
              } else {
                reject({
                  status: 200,
                  message: "Only staff or admin can access the admin site. ",
                });
              }
            })
            .catch((err) => {
              console.log("Error:", err);
              const response: Response = {
                status: err.response.status,
                message: err.response.data.message,
              };
              reject(response);
            });
        });
      },
      logout: async () => {
        const axios = useAxiosPrivate();

        return await new Promise<Response>((resolve, reject) => {
          axios
            .get("logout")
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
      },
      setUser: (user: UserInfo) => set((state) => ({ ...state.user, user })),
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      setTokens: (accessToken: string, refreshToken: string) =>
        set(() => ({ accessToken: accessToken, refreshToken: refreshToken })),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useAuthStore;
