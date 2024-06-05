// src/components/WeeklyCalendar.tsx
import React, { useState } from "react";
import dayjs from "dayjs";

const persons = [
  "Person 1",
  "Person 2",
  "Person 3",
  "Tool 1",
  "Tool 2",
  "Tool 3",
];
const timeSlots = Array.from({ length: 28 }, (_, i) =>
  dayjs()
    .startOf("day")
    .hour(7)
    .add(i * 30, "minute")
);

const WeeklyCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("week"));
  const [events, setEvents] = useState<{
    [key: string]: { title: string; color: string };
  }>({});

  const nextWeek = () => setCurrentWeek(currentWeek.add(1, "week"));
  const prevWeek = () => setCurrentWeek(currentWeek.subtract(1, "week"));

  const addEvent = (day: string, time: string, person: string) => {
    const title = prompt(`Add event for ${day} at ${time} for ${person}`);
    if (title) {
      const color = prompt(
        "Enter a color for the event (e.g., red, blue, green)"
      );
      setEvents({
        ...events,
        [`${day}-${time}-${person}`]: { title, color: color || "gray" },
      });
    }
  };

  const renderDays = () => {
    const days = Array.from({ length: 5 }, (_, i) =>
      currentWeek.add(i + 1, "day").format("YYYY-MM-DD")
    );
    return (
      <div className="grid grid-cols-5 gap-2">
        {days.map((day) => (
          <div key={day} className="border p-2">
            <div className="font-bold">{dayjs(day).format("dddd, MMM D")}</div>
            {timeSlots.map((time) => (
              <div key={time.format("HH:mm")} className="border-t p-1">
                {persons.map((person) => (
                  <div
                    key={person}
                    className="border-l border-r p-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addEvent(day, time.format("HH:mm"), person)}
                  >
                    <div>{time.format("HH:mm")}</div>
                    <div className="text-sm text-gray-600">
                      {
                        events[`${day}-${time.format("HH:mm")}-${person}`]
                          ?.title
                      }
                    </div>
                    <div
                      style={{
                        backgroundColor:
                          events[`${day}-${time.format("HH:mm")}-${person}`]
                            ?.color,
                      }}
                      className="h-4 w-full"
                    ></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={prevWeek}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <h2 className="text-2xl">{currentWeek.format("MMMM YYYY")}</h2>
        <button
          onClick={nextWeek}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <div>{renderDays()}</div>
    </div>
  );
};

export default WeeklyCalendar;
