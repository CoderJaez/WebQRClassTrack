import {
  DashboardPage,
  UserPage,
  ReservationPage,
  ClassroomPage,
  OccupancyPage,
  LoginPage,
} from "@pages/index";
import { Route } from "types";

const routes: Route[] = [
  { label: "Dashboard", path: "/", component: <DashboardPage /> },
  { label: "Occupancy", path: "/occupancies", component: <OccupancyPage /> },
  {
    label: "Reservation",
    path: "/reservations",
    component: <ReservationPage />,
  },
  { label: "Classroom", path: "/classrooms", component: <ClassroomPage /> },
  { label: "User", path: "/users", component: <UserPage /> },
];

export default routes;
