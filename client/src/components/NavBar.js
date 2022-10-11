import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  display: "inline-block",
  textAlign: "center",
  fontSize: "14px",
  width: "100px",
  padding: "12px",
  color: "white",
  background: "rgb(147, 186, 209)",
  marginRight: "10px",
  marginLeft: "10px",
  borderRadius: "15px 15px 0 0"
}

function NavBar({ user, setUser }) {

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      });
  }

  return (
    <div className="navbar">
      <h1>ForTheMems</h1>
      <div id='logout-button'>
        <h4>Hello, {user.username}!</h4>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='links'>
        <div id="left">
          <NavLink
            to="/"
            exact
            style={linkStyle}
            activeStyle={{ background: "darkblue", }}
          >
            My Friends
          </NavLink>
          <NavLink
            to="/all_memories"
            exact
            style={linkStyle}
            activeStyle={{ background: "darkblue", }}
          >
            My Memories
          </NavLink>
        </div>
        <div id="right">
          <NavLink
            to="/new_friend"
            exact
            style={linkStyle}
            activeStyle={{ background: "darkblue", }}
          >
            Add Friend
          </NavLink>
          <NavLink
            to="/new_memory"
            exact
            style={linkStyle}
            activeStyle={{ background: "darkblue", }}
          >
            Add Memory
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar;