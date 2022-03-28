import { useEffect } from "react";
import { CalendarDayType } from "../../types/DateTypes";

const CalendarDays = (props: {
  taskList: {
    id: string;
    title: string;
    date: Date;
  }[];
  day: Date;
  changeCurrentDay: (day: any) => void;
  editTask: (data: { id: string; title: string; date: Date }) => void;
}) => {
  const firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );

  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays: CalendarDayType[] = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      console.log(firstDayOfMonth);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day, idx) => {
        return (
          <div
            key={day.date.toDateString()}
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "") +
              (props.taskList
                .map((t) => t.date.toLocaleDateString("en-CA"))
                .includes(day.date.toLocaleDateString("en-CA"))
                ? " event"
                : "")
            }
            onClick={() => {
              if (
                props.taskList
                  .map((t) => t.date.toLocaleDateString("en-CA"))
                  .includes(day.date.toLocaleDateString("en-CA"))
              ) {
                let data = props.taskList.filter(
                  (t) =>
                    day.date.toLocaleDateString("en-CA") ===
                    t.date.toLocaleDateString("en-CA")
                );
                props.editTask(data[0]);
              }
              props.changeCurrentDay(day);
            }}
          >
            <p
              className={
                day.date.toLocaleDateString("en-CA") ===
                new Date().toLocaleDateString("en-CA")
                  ? "today"
                  : ""
              }
            >
              {day.number}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDays;
