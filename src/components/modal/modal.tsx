import React, { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./modal.css";

type AddTaskModalProps = {
  currentDay: Date;
  data: {
    id: string;
    title: string;
    date: Date;
  } | null;
  handleAddTask: (data: { id: string; title: string; date: Date }) => void;
  handleCloseModal: () => void;
};

const AddTaskModal: FC<AddTaskModalProps> = ({
  currentDay,
  data,
  handleAddTask,
  handleCloseModal,
}) => {
  const [inputVal, setInputVal] = useState({
    id: "",
    title: "",
    date: "",
  });

  const handleKeyChange = (key: string, e: any) => {
    console.log(key, e.target.value);

    setInputVal((prev) => {
      return {
        ...prev,
        [`${key}`]: e.target.value,
      };
    });
  };

  const handleDoneClick = () => {
    handleAddTask({
      ...inputVal,
      date: new Date(inputVal.date),
      id: inputVal.id.length === 0 ? uuidv4() : inputVal.id,
    });
    handleCloseModal();
  };

  const isValidDate =
    new Date(new Date(inputVal.date).toDateString()) >=
    new Date(new Date().toDateString())
      ? true
      : false;

  useEffect(() => {
    if (data != null) {
      setInputVal((prev) => {
        return {
          ...prev,
          ...data,
          date: data?.date.toLocaleDateString("en-CA"),
        };
      });
    }

    if (currentDay !== null || currentDay !== undefined)
      setInputVal((prev) => {
        return {
          ...prev,
          date: currentDay.toLocaleDateString("en-CA"),
        };
      });

    return () => {
      setInputVal({
        id: "",
        title: "",
        date: "",
      });
    };
  }, []);

  return (
    <div className="modal-container">
      <div className="details-container">
        <div className="modal-heading">
          <h3>Add Task</h3>
          <button className="cancel-modal" onClick={handleCloseModal}>
            x
          </button>
        </div>

        <input
          type={"text"}
          className="title-input"
          placeholder="Enter Title"
          value={inputVal.title}
          onChange={(e) => handleKeyChange("title", e)}
        />
        {inputVal.title.trim().length == 0 ? (
          <div className="not-valid-date">Please Select a Valid Title</div>
        ) : (
          <></>
        )}

        <input
          type={"date"}
          className="date-input"
          placeholder="Select Date"
          value={inputVal.date}
          onChange={(e) => handleKeyChange("date", e)}
        />
        {isValidDate ? (
          <></>
        ) : inputVal.date !== null ? (
          <div className="not-valid-date">Please Select a Valid Date</div>
        ) : (
          <></>
        )}
        <div className="action-container">
          <button
            disabled={!isValidDate}
            onClick={handleDoneClick}
            className="done-btn"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
