import { UserInfo } from "types";
import { create } from "zustand";

interface UserState {
  users: UserInfo[];
  add: (value: UserInfo) => void;
  remove: (id: string) => void;
  setUsers: (values: UserInfo[]) => void;
}

const useUserStore = create<UserState>()((set) => ({
  users: [],
  add: (value: UserInfo) =>
    set((state) => ({ users: [value, ...state.users] })),
  remove: (id: string) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  setUsers: (values: UserInfo[]) => set(() => ({ users: values })),
}));

export default useUserStore;
