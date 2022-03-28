import React, { useEffect, useState } from "react";
import Calender from "../components/calender/calender";
import AddTaskModal from "../components/modal/modal";
import NavBar from "../components/navBar/navBar";
import TaskList from "../components/taskList/taskList";
import { CurrentDateType, TaskType } from "../types/DateTypes";
import "./home.css";

type Props = {};

const Home = (props: Props) => {
  const [currentDate, setCurrentDate] = useState<CurrentDateType>({
    currentDay: new Date(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
  });

  const [taskList, setTaskList] = useState<
    {
      id: string;
      title: string;
      date: Date;
    }[]
  >([]);

  const [isEdit, setIsEdit] = useState<{
    isEditMode: boolean;
    data: null | {
      id: string;
      title: string;
      date: Date;
    };
  }>({
    isEditMode: false,
    data: null,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateLocalStorage = (
    key: string,
    val: {
      id: string;
      title: string;
      date: Date;
    }[]
  ) => {
    window &&
      window.localStorage.setItem(
        key,
        JSON.stringify(
          val.map((d) => {
            return {
              ...d,
              date: new Date(d.date),
            };
          })
        )
      );
  };

  const handleAddTask = (data: { id: string; title: string; date: Date }) => {
    console.log(data);
    if (isEdit.isEditMode) {
      setTaskList((prev) => {
        let val = prev.map((task) => {
          if (task.id === data.id) {
            console.log(data);
            return data;
          } else {
            return task;
          }
        });
        updateLocalStorage("task-list", val);
        return val;
      });

      setIsEdit({
        isEditMode: false,
        data: null,
      });
    } else {
      setTaskList((prev) => {
        let val = [data, ...prev];
        updateLocalStorage("task-list", val);
        return val;
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const editTask = (data: { id: string; title: string; date: Date }) => {
    console.log(data);
    setIsEdit((prev) => {
      return {
        ...prev,
        isEditMode: true,
        data: data,
      };
    });
    handleOpenModal();
  };

  const removeTask = (idx: number) => {
    setTaskList((prev) => {
      let data = prev.filter((dat, index) => idx != index);
      updateLocalStorage("task-list", data);
      return data;
    });
  };

  const changeCurrentDay = (day: any) => {
    console.log(day);
    setCurrentDate((prev) => {
      return { ...prev, currentDay: new Date(day.year, day.month, day.number) };
    });
  };

  useEffect(() => {
    let tasks = window && window.localStorage.getItem("task-list");
    if (tasks != null) {
      setTaskList(
        JSON.parse(tasks).map((d: any) => {
          return {
            ...d,
            date: new Date(d.date),
          };
        })
      );
    }

    return () => {
      setTaskList([]);
    };
  }, []);

  useEffect(() => {
    console.log(taskList);
  }, [taskList]);

  return (
    <>
      <div className="home-container">
        {isModalOpen ? (
          <AddTaskModal
            handleCloseModal={handleCloseModal}
            handleAddTask={handleAddTask}
            data={isEdit.data}
          />
        ) : (
          <></>
        )}
        <NavBar
          handlleOpenModal={handleOpenModal}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <div className="calender-taskList-container">
          <Calender
            taskList={taskList}
            currentDate={currentDate}
            changeCurrentDay={changeCurrentDay}
            editTask={editTask}
          />
          <TaskList
            taskList={taskList}
            removeTask={removeTask}
            editTask={editTask}
            currentDate={currentDate}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
