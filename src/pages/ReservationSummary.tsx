import { Container } from "@mantine/core";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import useScheduleStore from "@store/schedule.store";
import useScheduleService from "@services/ScheduleService";
import { Classroom, ClassroomSchedule, Schedule } from "types";

const WeeklyCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Starting from Monday
  const [roomSchedules, setRoomSchedules] = useState<ClassroomSchedule[]>([]);

  const { schedules } = useScheduleStore();
  const { getSchedule } = useScheduleService();
  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"));
  };

  const formatTime12Hour = (hour: number, minute: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    const minuteStr = minute === 0 ? "00" : "30";
    return `${hour12}:${minuteStr} ${period}`;
  };

  useEffect(() => {
    getSchedule();
    let classroomSched: ClassroomSchedule[] = [];
    const uniqueRoomIds: string[] = [];
    const rooms = schedules.filter((schedule) => {
      const isDuplicate = uniqueRoomIds.includes(schedule.classroom._id);
      if (!isDuplicate) {
        uniqueRoomIds.push(schedule.classroom._id);
        return true;
      }
      return false;
    });

    rooms.forEach((room) => {
      const filteredScheds = schedules.filter(
        (schedule) => schedule.classroom._id === room.classroom._id
      );
      const scheds: any = [];
      filteredScheds.forEach((fSched) => {
        scheds.push({
          day: fSched.day,
          time_from: fSched.time_from,
          time_to: fSched.time_to,
          course: fSched.course,
        });
      });

      classroomSched.push({
        classroom: room.classroom,
        schedules: scheds,
      });
    });
    setRoomSchedules(classroomSched);
  }, [currentWeek.get("date")]);

  const ScheduleWrapper = (room: Classroom, schedule: Schedule) => {
    const time_from = schedule.time_from.split(":");
    const time_to = schedule.time_to.split(":");
    return (
      <div className="p-2 rounded border-1 border-stone-200 bg-yellow-600 mb-4 ml-4">
        <div>{schedule.course.code}</div>
        <div>{`${formatTime12Hour(
          parseInt(time_from[0]),
          parseInt(time_from[1])
        )} - ${formatTime12Hour(
          parseInt(time_to[0]),
          parseInt(time_to[1])
        )}`}</div>
        {room.isOccupied ? (
          <div className="bg-red-500 text-slate-50 text-center">Occupied</div>
        ) : (
          <div className="bg-green-500 text-slate-50 rounded p-2 text-center">
            Vacant
          </div>
        )}
      </div>
    );
  };

  const renderTimeSlots = () => {
    return roomSchedules.map((room, roomIndex) => (
      <div className="border-2 mb-2 " key={roomIndex}>
        <div className="w-24 text-center mt-4 mb-4">
          {room.classroom.roomNo}
        </div>
        <div className="grid grid-cols-5 ">
          {[...Array(5)].map((_, index) => (
            <div
              key={`${room.classroom._id}${Math.random()}`}
              className="border-r-2 p-2"
            >
              <div className=" flex flex-col ">
                {/* Add room schedule here if necessary */}
                {room.schedules.map((sched, schedIndex) =>
                  currentWeek.add(index, "day").format("ddd") == sched.day ? (
                    <div key={schedIndex}>
                      {ScheduleWrapper(room.classroom, sched)}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const renderWeekDays = () => {
    const days = Array.from({ length: 5 }, (_, index) =>
      currentWeek.add(index, "day")
    );
    return days.map((day, index) => (
      <div key={index} className="flex-1 text-center">
        {day.format("ddd, MMM D")}
      </div>
    ));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePreviousWeek}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextWeek}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <div className="flex border-b sticky top-14 bg-lime-600 z-10 p-2">
        {renderWeekDays()}
      </div>
      <div>{renderTimeSlots()}</div>
    </div>
  );
};

const ReservationSummary: React.FC = () => {
  return (
    <Container fluid p="lg">
      <div className="container mx-auto">
        <div className="font-semibold text-lg mb-4">Custom Full Calendar</div>
        <WeeklyCalendar />
      </div>
    </Container>
  );
};

export default ReservationSummary;
