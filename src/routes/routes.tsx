import {
  Dashboard,
  User,
  Reservation,
  Classroom,
  Occupancy,
} from "@pages/index";
import { Route } from "types";

const routes: Route[] = [
  { label: "Dashboard", path: "/", component: <Dashboard /> },
  { label: "Occupancy", path: "/", component: <Occupancy /> },
  { label: "Reservation", path: "/", component: <Reservation /> },
  { label: "Classroom", path: "/", component: <Classroom /> },
  { label: "User", path: "/", component: <User /> },
];

export default routes;
