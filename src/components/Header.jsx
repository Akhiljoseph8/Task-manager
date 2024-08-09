import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
function Header() {
    const [user, setUser] = useState("")
    
useEffect(() => {
  setUser(sessionStorage.getItem("username"))
}, [])

    const logout = () => {
        sessionStorage.clear();
      };
    
  return (
    <Navbar className="bg-body-secondary d-flex justify-content-between">
      <Navbar.Brand className="ms-3 text-primary " href="/task">
        <i class="fa-solid fa-list"></i> Task Manager
      </Navbar.Brand>
          <h5>Welcome {user}</h5>
      <a className="btn btn-danger" onClick={logout} href="/">Logout</a>
    </Navbar>
  );
}

export default Header;