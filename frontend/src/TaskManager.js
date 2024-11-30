import TaskList from "./TaskList";
import { ToastContainer } from "react-toastify";
import AddTask from "./AddTask";

function TaskManager() {
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1 className="mb-4">Task Manager App</h1>
      <div className="d-flex justify-content-around w-75">
        <div className="d-flex flex-column justify-content-around align-items-center m-2 p-2 mb-2">
          <TaskList />
        </div>
        <div>
          <AddTask />
        </div>
      </div>
      {/* toastify */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
