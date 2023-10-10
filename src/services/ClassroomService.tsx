import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import { Classroom, Response } from "../types";

interface ClassroomResponse extends Response {
  data: Classroom[] | Classroom | null;
}
const useClassroom = () => {
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const vacateRoom = async (id: string) => {
    return await new Promise<Response>((resolve, reject) => {
      axiosPrivate
        .put(`occupancies/${id}`)
        .then((res) => {
          const result = {
            status: res.status,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) =>
          reject({ status: err.status, message: err.response.data.message }),
        );
    });
  };
  const occupyRoom = async (
    instructor: string | null | undefined,
    classroom: string,
  ) => {
    // console.log({instructor: instructor, classroom: classroom});
    return await new Promise<Response>((resolve, reject) => {
      axiosPrivate
        .post("occupancies", { instructor: instructor, classroom: classroom })
        .then((res) => {
          const response: Response = {
            status: res.status,
            message: res.data.message as string,
          };
          resolve(response);
        })
        .catch((err) => {
          console.log("Error:", err);
          const response = {
            status: err.response.status,
            message: err.response.data.message,
          };
          reject(response);
        });
    });
  };

  // const countClassroom = async () => {
  //   axiosPrivate.get
  // }

  const getClassroom = async (search: string) => {
    return await new Promise<Classroom[]>((resolve, reject) => {
      setLoading(true);
      axiosPrivate
        .get(`classrooms?roomNo=${search}`)
        .then((res) => {
          const result: Classroom[] = res.data;
          resolve(result);
        })
        .catch((err) => {
          console.log("Error:", err);
          reject([]);
        })
        .finally(() => setLoading(false));
    });
  };

  const getOccupiedClassroom = async (id: string, isVacant: boolean) => {
    return await new Promise<Classroom[]>((resolve, reject) => {
      axiosPrivate
        .get(`occupancies/${id}?&isVacant=${isVacant}`)
        .then((res) => {
          const result: Classroom[] = res.data;
          resolve(result);
        })
        .catch((err) => reject([]));
    });
  };

  const addClassroom = async (roomNo: string) => {
    setLoading(true);
    return await new Promise<ClassroomResponse>((resolve, reject) => {
      axiosPrivate
        .post("classrooms", { roomNo: roomNo })
        .then((res) => {
          const result = {
            status: res.status,
            data: res.data.data as Classroom,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) => {
          const result = {
            status: err.response.status,
            data: null,
            message: err.response.data.message,
          };
          reject(result);
        })
        .finally(() => setLoading(false));
    });
  };

  const updateClassroom = async (roomNo: string, id: string) => {
    setLoading(true);
    return await new Promise<Response>((resolve, reject) => {
      axiosPrivate
        .put(`classrooms/${id}`, { roomNo: roomNo })
        .then((res) => {
          const result = {
            status: res.status,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) => {
          const result = {
            status: err.response.status,
            message: err.response.data.message,
          };
          reject(result);
        })
        .finally(() => setLoading(false));
    });
  };

  const removeClassroom = async (id: string) => {
    setLoading(true);
    return await new Promise<Response>((resolve, reject) => {
      axiosPrivate
        .delete(`classrooms/${id}`)
        .then((res) => {
          const result = {
            status: res.status,
            message: res.data.message,
          };
          resolve(result);
        })
        .catch((err) => {
          const result = {
            status: err.response.status,
            message: err.response.data.message,
          };
          reject(result);
        })
        .finally(() => setLoading(false));
    });
  };

  return {
    occupyRoom,
    getClassroom,
    getOccupiedClassroom,
    vacateRoom,
    loading,
    updateClassroom,
    addClassroom,
    removeClassroom,
  };
};

export default useClassroom;
