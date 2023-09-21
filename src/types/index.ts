import React from "react";

export interface Route {
  label: string;
  path: string;
  component: React.ReactElement | null;
  leftSection: React.ReactElement;
  rightSection: React.ReactElement;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  role: string;
}

export interface UserInfo extends User {
  firstname: string;
  middlename: string;
  lastname: string;
  contact_no: string;
  image_path: string | null;
}

export interface Reservation {
  _id: string;
  event: string;
  dateFrom: Date;
  dateTo: Date;
  instructor: string;
  classroom: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Classroom {
  _id: string;
  roomNo: string;
}

export interface Response {
  status: number;
  message: string | Object;
}
