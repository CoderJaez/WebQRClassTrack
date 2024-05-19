import { SubjectSchedule } from "types";
import { create } from "zustand";
interface ScheduleState {
    schedules: SubjectSchedule[];
    setSchedule: (data: SubjectSchedule[]) => void;
    addOne: (data: SubjectSchedule) => void;
    updateOne: (data: SubjectSchedule) => void;
    removeOne: (id: string) => void
}

const useScheduleStore = create<ScheduleState>()((set) => ({
    schedules: [],
    setSchedule: (data: SubjectSchedule[]) => set(() => ({ schedules: data })),
    addOne: (data: SubjectSchedule) => set((state) => ({ schedules: [data, ...state.schedules] })),
    updateOne: (data: SubjectSchedule) => set((state) => ({ schedules: state.schedules.map(prev => prev._id === data._id ? { ...prev, ...data } : prev) })),
    removeOne: (id: string) => set((state) => ({ schedules: state.schedules.filter((prev) => prev._id !== id) }))

}))

export default useScheduleStore;