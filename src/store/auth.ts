import { create } from "zustand";
import { UserInfo, Response } from "types";
import axios from "api/axios";

interface UserState {
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<Response>;
  setUser: (user: UserInfo) => void;
  setAccessToken: (token: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

const useAuthStore = create<UserState>()((set) => ({
  user: {
    _id: "",
    email: "",
    role: "",
    password: "",
    firstname: "",
    middlename: "",
    lastname: "",
    contact_no: "",
    image_path: "",
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
          const response: Response = {
            status: res.status,
            message: res.data.message,
          };
          const user = { ...res.data.user, password: password };
          set((state) => ({ ...state.user, user }));
          set((state) => (state.accessToken = res.data.access_token));
          set((state) => (state.refreshToken = res.data.refresh_token));
          resolve(response);
        })
        .catch((err) => {
          console.log("Error", err);
          const response: Response = {
            status: err.response.status,
            message: err.response.data.message,
          };
          reject(response);
        });
    });
  },
  setUser: (user: UserInfo) => set((state) => ({ ...state.user, user })),
  setAccessToken: (token: string) => set(() => ({ accessToken: token })),
  setTokens: (accessToken: string, refreshToken: string) =>
    set(() => ({ accessToken: accessToken, refreshToken: refreshToken })),
}));

export default useAuthStore;
