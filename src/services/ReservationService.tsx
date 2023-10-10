import React from "react";
import { Reservation, Response } from "types";
import useReservationStore from "@store/reservation.store";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const useReservationService = () => {
  const [loading, setLoading] = React.useState(false);
  const axios = useAxiosPrivate();
  const { setReservations } = useReservationStore();

  const getReservations = async (search: string) => {
    setLoading(true);
    await new Promise<Response>((resolve, reject) => {
      axios
        .get(`reservations/?search=${search}`)
        .then((res) => {
          setReservations(res.data as Reservation[]);
          resolve({ status: res.status, message: "Ok" });
        })
        .catch((err) => {
          const result: Response = {
            status: err.response.status,
            message: err.response.data.message,
          };
          reject(result);
        })
        .finally(() => setLoading(false));
    });
  };

  return { getReservations, loading };
};

export default useReservationService;
