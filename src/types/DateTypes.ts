export type CurrentDateType = {
  currentDay: Date;
  currentMonth: number;
  currentYear: number;
};

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type CalendarDayType = {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
};

export type TaskType = {
  id: string;
  title: string;
  date: string;
};
