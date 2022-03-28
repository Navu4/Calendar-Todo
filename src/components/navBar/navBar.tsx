import React, { FC, useState } from "react";
import { CurrentDateType, months } from "../../types/DateTypes";
import "./navBar.css";

type NavBarProps = {
  handlleOpenModal: () => void;
  currentDate: CurrentDateType;
  setCurrentDate: React.Dispatch<React.SetStateAction<CurrentDateType>>;
};

const NavBar: FC<NavBarProps> = ({
  handlleOpenModal,
  currentDate,
  setCurrentDate,
}) => {
  const nextDay = () => {
    setCurrentDate((prev) => {
      return {
        ...prev,
        currentDay: new Date(
          prev.currentDay.getFullYear(),
          prev.currentDay.getMonth() + 1,
          1
        ),
        currentMonth: prev.currentDay.getMonth() + 1,
      };
    });
  };

  const previousDay = () => {
    setCurrentDate((prev) => {
      return {
        ...prev,
        currentDay: new Date(
          prev.currentDay.getFullYear(),
          prev.currentDay.getMonth() - 1,
          1
        ),
        currentMonth: prev.currentDay.getMonth() - 1,
      };
    });
  };

  return (
    <>
      <div className="navbar-container">
        <h2 className="todo-list-heading">To do List</h2>
        <div className="calendar-header">
          <div className="tools">
            <button onClick={previousDay}>
              <span className="material-icons">chevron_left</span>
            </button>
            <button onClick={nextDay}>
              <span className="material-icons">chevron_right</span>
            </button>
          </div>

          <div className="title">
            <h3>
              {months[currentDate.currentDay.getMonth()]}{" "}
              {currentDate.currentDay.getFullYear()}
            </h3>
          </div>
        </div>

        <button className="addTask-btn" onClick={handlleOpenModal}>
          + Add Task
        </button>
      </div>
    </>
  );
};

export default NavBar;
