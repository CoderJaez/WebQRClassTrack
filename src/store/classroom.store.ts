import { Classroom } from "types";
import { create } from "zustand";

interface ClassroomState {
  classrooms: Classroom[];
  addClassroom: (data: Classroom) => void;
  setClassrooms: (data: Classroom[]) => void;
  removeClassrom: (id: string) => void;
}

const useClassroomStore = create<ClassroomState>()((set) => ({
  classrooms: [],
  addClassroom: (data: Classroom) =>
    set((state) => ({ classrooms: [data, ...state.classrooms] })),
  setClassrooms: (data: Classroom[]) => set(() => ({ classrooms: data })),
  removeClassrom: (id: string) =>
    set((state) => ({
      classrooms: state.classrooms?.filter((room) => room._id !== id),
    })),
}));

export default useClassroomStore;
