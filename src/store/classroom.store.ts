import { Classroom } from "types";
import { create } from "zustand";

interface ClassroomState {
  classrooms: Classroom[];
  addOneClassroom: (data: Classroom) => void;
  setClassrooms: (data: Classroom[]) => void;
  removeOneClassroom: (id: string) => void;
}

const useClassroomStore = create<ClassroomState>()((set) => ({
  classrooms: [],
  addOneClassroom: (data: Classroom) =>
    set((state) => ({ classrooms: [data, ...state.classrooms] })),
  setClassrooms: (data: Classroom[]) => set(() => ({ classrooms: data })),
  removeOneClassroom: (id: string) =>
    set((state) => ({
      classrooms: state.classrooms?.filter((room) => room._id !== id),
    })),
}));

export default useClassroomStore;
