import React, { useState } from "react";
import { CreateTask } from "./api";
import { notify } from "./utils";
import { FaPlus } from "react-icons/fa";

function AddTask() {
  const [tName, setTName] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [due, setDue] = useState("");

  const handleAddTask = async () => {
    const obj = {
      taskName: tName,
      taskDescription: tDesc,
      dueDate: due,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        //success Toast
        notify(message, "success");
      } else {
        //error Toast
        notify(message, "error");
      }
      setTName("");
      setTDesc("");
      setDue("");
    } catch (err) {
      console.error(err);
      notify("Connection Fail", "error");
    }
  };
  return (
    <div>
      <form onSubmit={handleAddTask} className="p-2 rounded-3">
        <input
          className="w-100 border rounded-3 p-1 m-1"
          type="text"
          placeholder="Enter Title"
          value={tName}
          onChange={(e) => setTName(e.target.value)}
        ></input>
        <br />
        <textarea
          className="w-100 border rounded-3 p-1 m-1"
          placeholder="Description"
          value={tDesc}
          onChange={(e) => setTDesc(e.target.value)}
        ></textarea>
        <br />
        <input
          className="w-100 border rounded-3 p-1 m-1 mb-2"
          min={new Date().toISOString().split("T")[0]}
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        ></input>
        <br />
        <button className="btn btn-success btn-sm d-flex float-end align-items-center" type="submit">
          Add
          <FaPlus className="m-1" />
        </button>
      </form>
    </div>
  );
}

export default AddTask;