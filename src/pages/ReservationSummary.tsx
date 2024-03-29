import { Container } from "@mantine/core";
import React, { useState } from "react";
const ReservationSummary: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const generateTimeSlots = () => {
    const timeSlots: string[] = [];
    let startTime = new Date().setHours(7, 0, 0, 0); // Set start time to 7:00 AM
    const endTime = new Date().setHours(17, 0, 0, 0); // Set end time to 5:00 PM
    const interval = 30 * 60 * 1000; // 30 minutes in milliseconds

    while (startTime <= endTime) {
      timeSlots.push(
        new Date(startTime).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      startTime += interval;
    }

    return timeSlots;
  };

  // Function to get dates from Monday to Sunday
  const getDatesForWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -4 : 1)); // Monday of the current week

    const dates: Date[] = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Function to handle time slot selection
  const handleTimeSlotClick = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
  };
  return (
    <Container fluid p="lg">
      <div className="container mx-auto">
        <div className="font-semibold text-lg mb-4">Custom Full Calendar</div>
        {/* Calendar */}
        <div className="grid grid-cols-6 gap-1">
          {/* Header */}
          <div className="bg-gray-200 border border-gray-300 px-4 py-2">
            Room #
          </div>
          {getDatesForWeek().map((date, index) => (
            <div
              key={index}
              className="bg-gray-200 border border-gray-300 px-4 py-2"
            >
              {date.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          ))}

          {/* Example Content (Replace with dynamic content as needed) */}
          {/* Room #1 */}
          <div className="border border-gray-300 px-4 py-2">Room 1</div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border border-gray-300 px-4 py-2">
              {generateTimeSlots().map((timeSlot, idx) => (
                <div
                  key={idx}
                  className={`text-xs text-gray-600 cursor-pointer ${
                    selectedDateTime?.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    }) === timeSlot &&
                    selectedDateTime?.toLocaleDateString() ===
                      getDatesForWeek()[index].toLocaleDateString()
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() =>
                    handleTimeSlotClick(
                      new Date(
                        getDatesForWeek()[index].setHours(
                          idx / 2 + 7,
                          idx % 2 === 0 ? 0 : 30
                        )
                      )
                    )
                  }
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          ))}

          {/* Room #2 */}
          <div className="border border-gray-300 px-4 py-2">Room 2</div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border border-gray-300 px-4 py-2">
              {generateTimeSlots().map((timeSlot, idx) => (
                <div
                  key={idx}
                  className={`text-xs text-gray-600 cursor-pointer ${
                    selectedDateTime?.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    }) === timeSlot &&
                    selectedDateTime?.toLocaleDateString() ===
                      getDatesForWeek()[index].toLocaleDateString()
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() =>
                    handleTimeSlotClick(
                      new Date(
                        getDatesForWeek()[index].setHours(
                          idx / 2 + 7,
                          idx % 2 === 0 ? 0 : 30
                        )
                      )
                    )
                  }
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          ))}

          {/* Add more rooms and content as needed */}
        </div>
      </div>
    </Container>
  );
};

export default ReservationSummary;
