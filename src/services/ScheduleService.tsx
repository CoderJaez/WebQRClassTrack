import useScheduleStore from "@store/schedule.store";
import { Response, SubjectSchedule } from "types";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const useScheduleService = () => {
  const axios = useAxiosPrivate();
  const { schedules, addOne, setSchedule, updateOne, removeOne } =
    useScheduleStore();

  const getSchedule = () => {
    if (schedules.length <= 0)
      axios
        .get("schedules")
        .then((result) => {
          setSchedule(result.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
  };

  const postSchedule = (data: SubjectSchedule) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .post("schedules", data)
        .then((result) => {
          const newSchedule = { ...data, ...result.data.schedule };
          console.log(newSchedule);
          addOne(newSchedule as SubjectSchedule);
          resolve({ status: result.status, message: result.data.message });
        })
        .catch((err) => {
          if (err.response) {
            reject({
              status: err.response.status,
              message: err.response.data.message,
            });
          } else {
            reject({ status: 500, message: "Something went wrong." });
          }
        });
    });
  };

  const putSchedule = (id: string, data: SubjectSchedule) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .put(`schedules/${id}`, data)
        .then((result) => {
          updateOne(data);
          resolve({ status: result.status, message: result.data.message });
        })
        .catch((err) => {
          if (err.response) {
            reject({
              status: err.response.status,
              message: err.response.data.message,
            });
          } else {
            reject({ status: 500, message: "Something went wrong." });
          }
        });
    });
  };

  const deleteSchedule = (id: string) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .delete(`schedules/${id}`)
        .then((result) => {
          removeOne(id);
          resolve({ status: result.status, message: result.data.message });
        })
        .catch((err) => {
          if (err.response) {
            reject({
              status: err.response.status,
              message: err.response.message,
            });
          } else {
            console.error(err.message);
            reject({ status: 500, message: err.message });
          }
        });
    });
  };
  return { getSchedule, postSchedule, putSchedule, deleteSchedule };
};

export default useScheduleService;
