import React from "react";

export interface Route {
  label: String;
  path: String;
  component: React.ReactElement | null;
  leftSection: React.ReactElement;
  rightSection: React.ReactElement;
}

export interface User {
  _id: String;
  email: String;
  password: String;
  role: String;
}

export interface UserInfo extends User {
  firstname: String;
  middlename: String;
  lastname: String;
  contact_no: String;
  image_path: String | null;
}

export interface Reservation {
  _id: String;
  event: String;
  dateFrom: Date;
  dateTo: Date;
  instructor: String;
  classroom: String;
  status: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface Classroom {
  _id: String;
  roomNo: String;
}

export interface Response {
  status: Number;
  message: String | Object;
}
