import { create } from "zustand";
import { Occupancy } from "types";

interface OccupancyState {
  occupancies: Occupancy[];
  setOccupancies: (values: Occupancy[]) => void;
}

const useOccupancyStore = create<OccupancyState>()((set) => ({
  occupancies: [],
  setOccupancies: (values: Occupancy[]) => set({ occupancies: values }),
}));

export default useOccupancyStore;
