import { Reservation } from "types";
import { create } from "zustand";

interface StateProps {
  reservations: Reservation[];
  setReservations: (data: Reservation[]) => void;
  removeReservation: (data: string) => void;
  addReservation: (data: Reservation) => void;
  updateReservation: (data: Reservation) => void;
}

const useReservationStore = create<StateProps>()((set) => ({
  reservations: [],
  setReservations: (data: Reservation[]) => set(() => ({ reservations: data })),
  removeReservation: (id: string) =>
    set((state) => ({
      reservations: state.reservations.filter((item) => item._id !== id),
    })),
  addReservation: (data: Reservation) =>
    set((state) => ({ reservations: [data, ...state.reservations] })),
  updateReservation: (data: Reservation) =>
    set((state) => ({
      reservations: state.reservations.map((item) => item._id === data._id ? data:item),
    })),
}));

export default useReservationStore;
