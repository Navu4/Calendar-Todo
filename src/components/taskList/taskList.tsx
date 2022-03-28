import React, { FC, useMemo, useState } from "react";
import { CurrentDateType, TaskType } from "../../types/DateTypes";
import "./taskList.css";

type TaskListProps = {
  taskList: {
    id: string;
    title: string;
    date: Date;
  }[];
  currentDate: CurrentDateType;
  removeTask: (id: number) => void;
  editTask: (data: { id: string; title: string; date: Date }) => void;
};

const TaskList: FC<TaskListProps> = ({
  taskList,
  removeTask,
  editTask,
  currentDate,
}) => {
  const todoList = useMemo(() => {
    let firstDay = new Date(
      currentDate.currentDay.getFullYear(),
      currentDate.currentDay.getMonth(),
      0
    );
    let lastDay = new Date(
      currentDate.currentDay.getFullYear(),
      currentDate.currentDay.getMonth() + 1,
      1
    );

    return taskList
      .filter((task) => firstDay <= task.date && task.date <= lastDay)
      .sort(function (a, b) {
        return a.date.getTime() - b.date.getTime();
      });
  }, [taskList, currentDate.currentDay]);

  return (
    <div className="taskList-container">
      <div className="list-header">Tasks</div>
      <div className="list-container">
        {todoList.map((todo, idx) => {
          return (
            <TaskCard
              key={todo.id}
              data={todo}
              handleEdit={() => editTask(todo)}
              handleRemoveTask={() => removeTask(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;

const TaskCard: FC<{
  data: {
    id: string;
    title: string;
    date: Date;
  };
  handleRemoveTask: () => void;
  handleEdit: () => void;
}> = ({ data, handleRemoveTask, handleEdit }) => {
  const date = data.date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });

  return (
    <div className="taskcard-container">
      <div className="task-details" onClick={handleEdit}>
        <div className="task-date">{date}</div>
        <div className="task-title">{data.title}</div>
      </div>
      <div className="remove-container" onClick={handleRemoveTask}>
        <button className="delete-task">x</button>
      </div>
    </div>
  );
};
