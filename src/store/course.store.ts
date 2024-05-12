import { create } from "zustand";
import { Course } from "types";

interface CourseState {
    courses: Course[];
    setCourse: (data: Course[]) => void;
    addOne: (data: Course) => void;
    updateOne: (data: Course) => void;
    removeOne: (id: string) => void;
}


const useCourseStore = create<CourseState>()((set) => ({
    courses: [],
    setCourse: (data: Course[]) => set(() => ({ courses: data })),
    addOne: (data: Course) => set((state) => ({ courses: [data, ...state.courses] })),
    updateOne: (data: Course) => set((state) => ({ courses: state.courses.map(prev => prev._id === data._id ? { ...prev, ...data } : prev) })),
    removeOne: (id: string) => set((state) => ({ courses: state.courses.filter((prev) => prev._id !== id) }))

}))


export default useCourseStore;