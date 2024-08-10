import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addTask, getTask,updateTask,deleteTask } from "../services/allApis";
import { toast } from "react-toastify";
import Header from "../components/Header";

function Task() {
  const [taskList, setTaskList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [logStatus, setLogStatus] = useState(false);
  const [data, setData] = useState({
    userId: "",
    task: "",
    createdTime: "",
    updateTime: "",
    status: "",
  });

const navigate = useNavigate("");

  useEffect(() => {
    getTasks();
    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
      var userId = sessionStorage.getItem("userId");
      setData({ ...data, userId: userId });
    } else {
      setLogStatus(false);
    }
  }, [logStatus,taskList]);

  

  // Function to toggle the editable state for a specific row
  const toggleEditable = (id) => {
    const rowData = taskList.find((data) => data._id === id);
    if (rowData) {
      setEditableId(id);
      setEditedTask(rowData.task);
      setEditedStatus(rowData.status);
    } else {
      setEditableId(null);
      setEditedTask("");
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  // Function to add task to the database
  const Taskadd = async (e) => {
    e.preventDefault();
    const { task, status, createdTime, updateTime, userId } = data;
    if (!status || !task) {
      alert("All fields must be filled out.");
      return;
    } else {
        const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
      const result = await addTask(data,header);
      setTaskList(result.data);
      if (result.status == 200) {
        toast.success("Task added");
        setData({ task: "", createdTime: "", updateTime: "", status: "" });
      } else {
        toast.error(result.response.data);
      }
    }
  };

  // Function to get tasks from database
  const getTasks = async () => {
    const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
      const res = await getTask(header);
      setTaskList(res.data);
  };

  // Function to save edited data to the database
  const saveEditedTask = async (id) => {
    const editedData = {
      taskId: id,
      task: editedTask,
      status: editedStatus,
      updateTime: new Date(),
    };
    // If the fields are empty
    if (!editedTask || !editedStatus) {
      alert("All fields must be filled out.");
      return;
    } else {
     const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
      const result = await updateTask(editedData,header);
      console.log(result);
      if (result.status == 200) {
        toast.success("Task updated");
        setEditableId(null)
        setEditedTask("");
        setEditedStatus("");
      } else {
        toast.error(result.response.data);
      }
    }
  };

  // Delete task from database
  const removeTask = async (id) => {
    const header = {"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const res = await deleteTask(id,header);
    if (res.status == 200) {
      toast.success("Task deleted");
    }
  };

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          
          <div className="table-responsive">
          {Array.isArray(taskList)&&taskList.length>0 ? (
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Created Time</th>
                  <th>Updated Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              
                <tbody>
                  {taskList.map((data) => (
                    <tr key={data._id}>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <>
                            <input
                              name="status"
                              type="radio"
                              value="pending"
                              id="pen"
                              onChange={(e) => {
                                setEditedStatus(e.target.value);
                              }}
                            />
                            <label for="pen">Pending</label> <br />
                            <input
                              name="status"
                              type="radio"
                              value="completed"
                              id="com"
                              onChange={(e) => {
                                setEditedStatus(e.target.value);
                              }}
                            />
                            <label for="pen">Completed</label>
                          </>
                        ) : (
                          data.status
                        )}
                      </td>
                      <td>{new Date(data.createdTime).toLocaleString()}</td>
                      {data.updateTime ? (
                        <td>{new Date(data.updateTime).toLocaleString()}</td>
                      ) : (
                        "Not updated"
                      )}

                      <td>
                        {editableId === data._id ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm ml-1"
                          onClick={() => removeTask(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
               
            </table>):<h3 className="text-danger">You have no tasks. Add your tasks</h3>}
          </div>
        </div>
        <div className="col-md-4">
          <h3 className="text-center">Add Task</h3>
          <form className="bg-light p-4">
            <div className="mb-3">
              <label>Task</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Task"
                onChange={(e) => {
                  setData({ ...data, task: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label>Status</label> <br />
              <input
                name="status"
                type="radio"
                value="pending"
                id="pen"
                onChange={(e) => {
                  setData({
                    ...data,
                    status: e.target.value,
                    createdTime: new Date(),
              
                  });
                }}
              />
              <label for="pen">Pending</label> <br />
              <input
                name="status"
                type="radio"
                value="completed"
                id="com"
                onChange={(e) => {
                  setData({
                    ...data,
                    status: e.target.value,
                    createdTime: new Date(),
                
                  });
                }}
              />
              <label for="pen">Completed</label>
            </div>
            <button onClick={Taskadd} className="btn btn-success btn-sm">
              Add Task
            </button>
          </form>
        </div>
        
      </div>
    </div>
    </>
  );
}
export default Task;
