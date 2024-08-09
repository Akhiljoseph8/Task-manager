import './App.css'
import { Route, Routes } from "react-router-dom";
import Auth from './pages/Auth'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Task from './pages/Task';

function App() {
 
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/task" element={<Task />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
