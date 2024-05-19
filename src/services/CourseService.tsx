import { Course, Response } from "types";
import useCourseStore from "@store/course.store";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import useProgramStore from "@store/program.store";

const useCourseService = () => {
  const axios = useAxiosPrivate();
  const { courses, setCourse, addOne, removeOne, updateOne } = useCourseStore();
  const { programs } = useProgramStore();
  const getCourses = () => {
    if (courses.length <= 0) {
      axios
        .get("settings/courses")
        .then((result) => {
          setCourse(result.data as Course[]);
        })
        .catch((err) => {
          if (err.response) {
            console.error(err.response.message);
          } else {
            console.error(err.message);
          }
        });
    }
  };

  const addCourse = (data: Course) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .post(`settings/courses`, data)
        .then((result) => {
          const newCourse = result.data.course as Course;
          newCourse.program = programs.find(
            (p) => p._id === result.data.course.program
          );

          addOne(newCourse);
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

  const updateCourse = (id: string, data: Course) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .put(`settings/courses/${id}`, data)
        .then((result) => {
          const updateData = { ...data, _id: id };
          updateOne(updateData);
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

  const deletCourse = (id: string) => {
    return new Promise<Response>((resolve, reject) => {
      axios
        .delete(`settings/courses/${id}`)
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

  return { getCourses, addCourse, updateCourse, deletCourse };
};

export default useCourseService;
