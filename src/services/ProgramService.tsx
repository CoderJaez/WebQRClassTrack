import useAxiosPrivate from "@hooks/useAxiosPrivate";
import { Program, Response } from "types";
import useProgramStore from "@store/program.store";

const useProgramService = () => {
  const axios = useAxiosPrivate();
  const { addProgram, setProgram, deleteProgram, updateProgram, programs } =
    useProgramStore();

  const postProgram = (data: Program) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .post("settings/programs", data)
        .then((result) => {
          const newProgram = result.data.program as Program;
          addProgram(newProgram);
          resolve({ status: result.status, message: result.data.message });
        })
        .catch((err) => {
          if (err.response) {
            reject({
              status: err.response.status,
              message: err.response.message,
            });
          } else {
            console.log("Error:", err.message);
            reject({ status: 500, message: err.message });
          }
        });
    });
  };

  const getProgram = () => {
    if (programs.length <= 0)
      axios
        .get("settings/programs")
        .then((result) => {
          const programs = result.data as Program[];
          setProgram(programs);
        })
        .catch((err) => {
          console.error(err.message);
          if (err.response) {
          }
        });
  };

  const removeProgram = (id: string) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .delete(`settings/programs/${id}`)
        .then((result) => {
          deleteProgram(id);
          resolve({ status: result.status, message: result.data.message });
        })
        .catch((err) => {
          if (err.response) {
            reject({
              status: err.response.status,
              message: err.response.message,
            });
          } else {
            console.log("Error:", err.message);
            reject({ status: 500, message: err.message });
          }
        });
    });
  };

  const putProgram = (id: string, data: Program) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .put(`settings/programs/${id}`, data)
        .then((result) => {
          resolve({ status: result.status, message: result.data.message });
          const updateData = { ...data, _id: id };
          updateProgram(updateData);
        })
        .catch((err) => {
          if (err.response) {
            reject({
              status: err.response.status,
              message: err.response.message,
            });
          } else {
            console.log("Error:", err.message);
            reject({ status: 500, message: err.message });
          }
        });
    });
  };

  return { postProgram, getProgram, removeProgram, putProgram };
};

export default useProgramService;
