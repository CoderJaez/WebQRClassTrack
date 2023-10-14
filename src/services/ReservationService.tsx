import React from "react";
import { Reservation, Response } from "types";
import useReservationStore from "@store/reservation.store";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const useReservationService = () => {
  const [loading, setLoading] = React.useState(false);
  const axios = useAxiosPrivate();
  const {
    reservations,
    removeReservation,
    setReservations,
    updateReservation,
  } = useReservationStore();

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

  const updateReservationStatus = async (id: string, value: string) => {
    return await new Promise<Response>((resolve, reject) => {
      axios
        .put(`reservations/update-status/${id}`, { status: value })
        .then((res) => {
          const reservation = reservations.find((item) => item._id === id);
          const updatedReservation = {
            ...reservation,
            ...{ status: value },
          } as Reservation;
          updateReservation(updatedReservation);
          resolve({
            status: res.status,
            message: res.data.message,
          });
        })
        .catch((err) => {
          reject({
            status: err.response.status,
            message: err.response.data.message,
          });
        });
    });
  };

  const deleteReservation = async (id: string) => {
    return await new Promise<Response>((resolve, reject) => {
      axios
        .delete(`reservations/${id}`)
        .then((res) => {
          removeReservation(id);
          resolve({
            status: res.status,
            message: res.data.message,
          });
        })
        .catch((err) => {
          reject({
            status: err.response.status,
            message: err.response.data.message,
          });
        });
    });
  };

  return {
    getReservations,
    loading,
    updateReservationStatus,
    deleteReservation,
  };
};

export default useReservationService;
