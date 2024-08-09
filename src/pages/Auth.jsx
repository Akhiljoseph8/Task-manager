import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { userRegister, userLogin } from "../services/allApis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [status, setStatus] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeStatus = () => {
    setStatus(!status);
  };

  const navigate = useNavigate("");

//Register handling function
  const handleRgister = async () => {
    const { username, password, email } = data;
    if (!username || !password || !email) {
      toast.warning("Invalid Inputs!! Enter all inputs!!");
    } else {
      const result = await userRegister(data);
      if (result.status == 200) {
        toast.success("Registration successfull");
        setData({ username: "", password: "", email: "" });
        window.location.reload();
      } else {
        toast.error(result.response.data);
      }
    }
  };

  //Login handling function
  const handleLogin = async () => {
    const { password, email } = data;
    if (!password || !email) {
      toast.warning("Invalid Inputs!! Enter all inputs!!");
    } else {
      const result = await userLogin({ email, password });
      if (result.status == 200) {
        toast.success("Login successfull");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("username", result.data.user);
        sessionStorage.setItem("userId", result.data.userId);
        navigate("/task");
      } else {
        toast.error(result.response.data);
      }
    }
  };


  return (
    <>
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <div className="w-10 bg-primary border shadow "></div>
        <Row>
          <Col>
            <img
              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
              alt="image"
              className="img-fluid"
            />
          </Col>
          <Col className="p-5">
            {status ? (
              <h3 className="mb-3">Login</h3>
            ) : (
              <h3 className="mb-3">Register</h3>
            )}
            <div>
              {!status && (
                <FloatingLabel
                  controlId="floatingUser"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                  />
                </FloatingLabel>
              )}

              <FloatingLabel
                controlId="floatingInput"
                label="email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Username"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
              </FloatingLabel>
              <div className="mt-3 d-flex justify-content-between">
                {status ? (
                  <button
                    className="btn btn-outline-success"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    onClick={handleRgister}
                  >
                    Register
                  </button>
                )}

                <button
                  className="btn btn-link text-dark"
                  onClick={changeStatus}
                >
                  {status ? (
                    <span>New User?</span>
                  ) : (
                    <span>Already a User?</span>
                  )}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Auth;