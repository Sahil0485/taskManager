import React, { useEffect, useState } from "react";
import { FaSearch, FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";
import { DeleteTaskById, GetAllTasks, UpdateTaskById } from "./api";
import { notify } from "./utils";
import EditTask from "./EditTask";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = () => {
    if (updateTask) {
    }
  };
  useEffect(() => {
    if (updateTask) {
      // setTName(updateTask.taskName);
      // setTDesc(updateTask.taskDescription);
      // setDue(updateTask.dueDate);
    }
  });

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify("Connection Fail", "error");
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    alert("You are Deleting Task");
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        //success Toast
        notify(message, "success");
      } else {
        //error Toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Connection Fail", "error");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    try {
      const { _id, isDone, taskName, taskDescription, dueDate } = item;
      const obj = {
        taskName,
        isDone: !isDone,
        taskDescription,
        dueDate,
      };
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //success Toast
        notify(message, "success");
      } else {
        //error Toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Connection Fail", "error");
    }
  };
  const handleUpdateTask = (item) => {};
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };

  return (
    <div>
      <div>
        <div className="d-flex input-group flex-grow-1 me-4">
          <input
            type="text"
            className="border"
            onChange={(e) => handleSearch(e)}
            placeholder="Search..."
          />
          <span className="input-group-text">
            <FaSearch />
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        {tasks.map((item) => (
          <div className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
            <div>
              <h4 className={item.isDone ? "text-decoration-line-through" : ""}>
                {item.taskName}
              </h4>
              <p className="fs-6">{item.taskDescription}</p>
              {item.dueDate ? (
                <div className="d-flex flex-row">
                  <span>
                    <b>Due Date:- </b>&nbsp;
                  </span>
                  <input
                    className="border border-0"
                    value={item.dueDate.toString().split("T")[0]}
                    type="date"
                    disabled
                  ></input>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <button
                className="btn btn-success me-2"
                onClick={() => handleCheckAndUncheck(item)}
                type="button"
              >
                <FaCheck />
              </button>
              <button
                className="btn btn-primary me-2"
                onClick={() => handleUpdateTask(item)}
                type="button"
              >
                <FaPencilAlt />
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={() => handleDeleteTask(item._id)}
                type="button"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
