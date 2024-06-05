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
  image: { filename: string; path: string } | null;
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

export interface Classroom {
  _id: string;
  roomNo: string;
  createdAt: Date;
  updatedAt: Date;
  isOccupied: boolean;
}

export interface QrCode {
  type: string;
  code: string;
}

export interface Occupancy {
  _id: string;
  instructor: string;
  image_path: string;
  roomNo: string;
  isVacant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  _id: string;
  event: string;
  dateFrom: Date;
  dateTo: Date;
  instructor: string;
  classroom: string;
  status: string;
}
export interface QrCode {
  type: string;
  code: string;
}

export enum Action {
  EDIT,
  DELETE,
  RESERVATION_STATUS,
}

export interface Program {
  _id?: string;
  name: string;
  description: string;
  courses?: Course[];
  createdAt?: Date;
  updatedAt?: Date
}

export interface Course {
  _id?: string;
  code: string;
  sem: string;
  description: string;
  program?: Program;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface SubjectSchedule {
  _id?: string;
  course: Course;
  program: Program;
  classroom: Classroom;
  day: string;
  time_from: string;
  time_to: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClassroomSchedule {
  classroom: Classroom,
  schedules: [Schedule]
}

export interface Schedule {
  day: string;
  time_from: string;
  time_to: string;
  course: Course;
}