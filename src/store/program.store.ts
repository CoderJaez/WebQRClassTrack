import { create } from "zustand";
import { Program, } from "types";

interface ProgramState {
    programs: Program[],
    addProgram: (data: Program) => void;
    setProgram: (data: Program[]) => void;
    deleteProgram: (programId: string) => void;
    updateProgram: (data: Program) => void;
}

const useProgramStore = create<ProgramState>()((set) => ({
    programs: [],
    addProgram: (data: Program) => {
        set((state) => ({ programs: [data, ...state.programs] }));
    },
    setProgram: (data: Program[]) => {
        set({ programs: data })
    },
    deleteProgram: (programId: string) => set((state) => ({ programs: state.programs.filter(prev => prev._id !== programId) })),
    updateProgram: (data: Program) => {
        set((state) => ({ programs: state.programs.map(prev => prev._id === data._id ? { ...prev, ...{ name: data.name, description: data.description } } : prev) }))
    }
}))


export default useProgramStore