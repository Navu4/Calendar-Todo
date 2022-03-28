import moment from "moment";
import React, { FC, useState } from "react";
import { CurrentDateType, weekdays } from "../../types/DateTypes";
import CalendarDays from "./calendarDays";
import "./calender.css";

type CalenderProps = {
  taskList: {
    id: string;
    title: string;
    date: Date;
  }[];
  currentDate: CurrentDateType;
  changeCurrentDay: (data: any) => void;
  editTask: (data: { id: string; title: string; date: Date }) => void;
};

const Calender: FC<CalenderProps> = ({
  currentDate,
  changeCurrentDay,
  taskList,
  editTask,
}) => {
  const [showCalender, setShowCalender] = useState(true);

  const handleShowClick = () => {
    setShowCalender((prev) => !prev);
  };

  return (
    <>
      {showCalender ? (
        <div className="calendar">
          <div className="calendar-body">
            <div className="table-header">
              {weekdays.map((weekday, index) => {
                return (
                  <div key={weekday} className="weekday">
                    {weekday}
                  </div>
                );
              })}
            </div>
            <CalendarDays
              taskList={taskList}
              day={currentDate.currentDay}
              changeCurrentDay={changeCurrentDay}
              editTask={editTask}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="show-calender-container" onClick={handleShowClick}>
        {!showCalender ? "Show Calender" : "Hide Calendar"}
      </div>
    </>
  );
};

export default Calender;
