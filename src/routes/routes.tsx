import {
  ClassroomPage,
  DashboardPage,
  OccupancyPage,
  ReservationSummary,
  SchedulingPage,
  UserPage,
} from "@pages/index";
import { Calendar, Chalkboard, FileStack, User } from "tabler-icons-react";
import { Route } from "types";

const routes: Omit<Route, "leftSection" | "rightSection">[] = [
  { label: "Dashboard", path: "/dashboard", component: <DashboardPage /> },
  { label: "Occupancy", path: "/occupancies", component: <OccupancyPage /> },
  { label: "Scheduling", path: "/scheduling", component: <SchedulingPage /> },
  {
    label: "Reservations",
    path: "/reservations",
    component: <ReservationSummary />,
  },
  { label: "Classrooms", path: "/classrooms", component: <ClassroomPage /> },
  { label: "User", path: "/users", component: <UserPage /> },
];

export const navLinks: Omit<Route, "component" | "rightSection">[] = [
  // {
  //   label: "Dashboard",
  //   path: "/dashboard",
  //   leftSection: <Dashboard size="1rem" strokeWidth={1.5} />,
  // },
  {
    label: "Scheduling",
    path: "/scheduling",
    leftSection: <Calendar size="1rem" strokeWidth={1.5} />,
  },
  {
    label: "Occupancies",
    path: "/occupancies",
    leftSection: <Chalkboard size="1rem" strokeWidth={1.5} />,
  },
  {
    label: "Reservations",
    path: "/reservations",
    leftSection: <FileStack size="1rem" strokeWidth={1.5} />,
  },
  {
    label: "Classrooms",
    path: "/classrooms",
    leftSection: <Chalkboard size="1rem" strokeWidth={1.5} />,
  },
  {
    label: "User",
    path: "/users",
    leftSection: <User size="1rem" strokeWidth={1.5} />,
  },
];

export default routes;
