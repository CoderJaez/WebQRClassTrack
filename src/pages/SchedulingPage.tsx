import {
  Container,
  Flex,
  Button,
  Modal,
  Fieldset,
  Select,
  ComboboxData,
  Title,
  Table,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useClassroom from "@services/ClassroomService";
import useCourseService from "@services/CourseService";
import useProgramService from "@services/ProgramService";
import useClassroomStore from "@store/classroom.store";
import useCourseStore from "@store/course.store";
import useProgramStore from "@store/program.store";
import React, { useEffect, useState } from "react";
import { Classroom, Course, Program, Response, SubjectSchedule } from "types";
import { useForm } from "@mantine/form";
import useScheduleService from "@services/ScheduleService";
import Swal from "sweetalert2";
import useScheduleStore from "@store/schedule.store";
import moment from "moment";
import { Edit, Trash } from "tabler-icons-react";
const SchedulingPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { programs } = useProgramStore();
  const { courses } = useCourseStore();
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const { classrooms, setClassrooms } = useClassroomStore();
  const [_courses, setCourses] = useState<ComboboxData | undefined>(undefined);
  const { getProgram } = useProgramService();
  const { getClassroom } = useClassroom();
  const { schedules } = useScheduleStore();
  const { getSchedule, postSchedule, putSchedule, deleteSchedule } =
    useScheduleService();
  const { getCourses } = useCourseService();
  useEffect(() => {
    if (programs.length <= 0) {
      getProgram();
    }
    if (courses.length <= 0) getCourses();

    if (classrooms.length <= 0)
      getClassroom("").then((result) => setClassrooms(result));
  }, []);

  useEffect(() => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        getSchedule();
        Swal.close();
      },
    });
  }, []);
  function getTimeList() {
    let timeList = [];
    for (let i = 7; i <= 20; i++) {
      for (let j = 0; j < 60; j += 30) {
        let hour = i;
        let minute = j;
        let period = hour < 12 ? "AM" : "PM";

        if (hour > 12) {
          hour -= 12;
        }

        if (hour === 0) {
          hour = 12;
        }

        let time = `${hour}:${minute < 10 ? "0" + minute : minute} ${period}`;
        timeList.push({
          value: `${String(i).padStart(2, "0")}:${String(j).padStart(
            2,
            "0"
          )}:00`,
          label: time,
        });

        if (time === "8:30 PM") {
          return timeList;
        }
      }
    }
    return timeList;
  }

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      courseId: "",
      day: "",
      roomId: "",
      programId: "",
      time_to: "",
      time_from: "",
    },
    validate: {
      programId: (value) =>
        value.trim().length !== 0 ? null : "Program is required",
      courseId: (value) =>
        value.trim().length !== 0 ? null : "Course is required",
      roomId: (value) =>
        value.trim().length !== 0 ? null : "Room is required",
      day: (value) => (value.trim().length !== 0 ? null : "Day is required"),
      time_from: (value) =>
        value.trim().length !== 0 ? null : "Time from is required",
      time_to: (value) =>
        value.trim().length !== 0 ? null : "Time to is required",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    Swal.fire({
      title: "Confirmation",
      text: "Do you want to save it now?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      icon: "question",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        Swal.fire({
          title: "Loading",
          text: "Please wait saving your data.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            const data: SubjectSchedule = {
              program: programs.find(
                (p) => p._id === values.programId
              ) as Program,
              course: courses.find((c) => c._id === values.courseId) as Course,
              classroom: classrooms.find(
                (r) => r._id === values.roomId
              ) as Classroom,
              time_from: values.time_from,
              time_to: values.time_to,
              day: values.day,
            };
            if (scheduleId) {
              putSchedule(scheduleId, data)
                .then((result: Response) => {
                  Swal.fire("Success", result.message as string, "success");
                  form.reset();
                  setScheduleId(null);
                })
                .catch((err: any) => {
                  Swal.close();
                  if (err.status === 400) {
                    err.message.forEach((msg: any) =>
                      form.setFieldError(msg.field, msg.message)
                    );
                  } else {
                    console.error(err.message);
                    Swal.fire("Opps!", "Something went wrong", "error");
                  }
                });
              return;
            }
            postSchedule(data)
              .then((result) => {
                Swal.fire("Success", result.message as string, "success");
                form.reset();
              })
              .catch((err) => {
                Swal.close();
                if (err.status === 400) {
                  err.message.forEach((msg: any) =>
                    form.setFieldError(msg.field, msg.message)
                  );
                } else {
                  console.error(err.message);
                  Swal.fire("Opps!", "Something went wrong", "error");
                }
              });
          },
        });
      }
    });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Confirmation",
      text: "Do want to delete selected course?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        Swal.fire({
          title: "Loading",
          allowOutsideClick: true,
          didOpen: () => {
            Swal.showLoading();
            deleteSchedule(id)
              .then((result) => {
                Swal.fire("Success", result.message as string, "success");
              })
              .catch((err) => {
                console.log(err);
                Swal.fire("Opps!", "Something went wrong", "error");
              });
          },
        });
      }
    });
  };

  const action = (id: string) => {
    return (
      <Group justify="row">
        <Tooltip label="Edit Classroom">
          <ActionIcon variant="filled" color="yellow" aria-label="edit">
            <Edit
              onClick={() => {
                const sched = schedules.find((prev) => prev._id === id);
                setScheduleId(sched?._id as string);
                form.setFieldValue("day", sched?.day as string);
                form.setFieldValue("time_from", sched?.time_from as string);
                form.setFieldValue("time_to", sched?.time_to as string);
                form.setFieldValue("roomId", sched?.classroom._id as string);
                form.setFieldValue("programId", sched?.program._id as string);
                form.setFieldValue("courseId", sched?.course._id as string);
                open();
              }}
              style={{ width: "70%", height: "70%" }}
              strokeWidth={1.5}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Classroom">
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="delete"
            onClick={() => handleDelete(id)}
          >
            <Trash style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    );
  };

  return (
    <Container fluid p="lg">
      <Modal title="Schedule" opened={opened} onClose={close} size="50vw">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Fieldset title="New Schedule">
            <Select
              label="Day"
              placeholder="Pick day"
              data={["Mon", "Tue", "Wed", "Thu", "Fri"]}
              multiple
              {...form.getInputProps("day")}
            />

            <Select
              label="Room #"
              data={classrooms.map((room: Classroom) => ({
                value: room._id,
                label: room.roomNo,
              }))}
              {...form.getInputProps("roomId")}
            />
            <Select
              error={form.errors["programId"]}
              label="Program"
              data={programs.map((program: Program) => ({
                value: program._id as string,
                label: program.name,
              }))}
              onChange={(value: string | null) => {
                if (!value) return;
                const _data = programs.find((p: Program) => p._id === value);
                if (value) form.setFieldValue("courseId", "");
                if (_data && (_data?.courses?.length as number) <= 0) {
                  return;
                }
                form.setFieldValue("programId", value as string);
                setCourses(
                  _data?.courses?.map((course: Course) => ({
                    value: course._id,
                    label: course.code,
                  })) as ComboboxData
                );
              }}
            />

            <Select
              label="Course Code"
              data={_courses}
              {...form.getInputProps("courseId")}
            />
          </Fieldset>

          <Fieldset legend="Time:">
            <Flex gap="sm">
              <Select
                label="From"
                data={getTimeList()}
                {...form.getInputProps("time_from")}
              />
              <Select
                label="To"
                data={getTimeList()}
                {...form.getInputProps("time_to")}
              />
            </Flex>
          </Fieldset>

          <Button type="submit">Add</Button>
        </form>
      </Modal>

      <Title order={3}>Schedules</Title>
      <Flex gap="sm" align="center" justify="flex-end">
        <Button
          onClick={() => {
            form.reset();
            setScheduleId(null);
            open();
          }}
        >
          New Schedule
        </Button>
      </Flex>
      <Table.ScrollContainer minWidth={700}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Program</Table.Th>
              <Table.Th>Subject</Table.Th>
              <Table.Th>Room #</Table.Th>
              <Table.Th>Day</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {schedules.map((sched: SubjectSchedule, index: number) => (
              <Table.Tr key={index}>
                <Table.Td>{sched.program.name.toUpperCase()}</Table.Td>
                <Table.Td>{sched.course.code.toUpperCase()}</Table.Td>
                <Table.Td>{sched.classroom.roomNo.toUpperCase()}</Table.Td>
                <Table.Td>{sched.day}</Table.Td>
                <Table.Td>
                  {`${moment(`01/01/01 ${sched.time_from}`).format(
                    "hh:mm A"
                  )} - ${moment(`01/01/01 ${sched.time_to}`).format(
                    "hh:mm A"
                  )}`}
                </Table.Td>
                <Table.Td>{action(sched._id as string)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Container>
  );
};

export default SchedulingPage;
