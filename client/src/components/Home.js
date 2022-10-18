import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
// import styled from "styled-components";
// import { button } from "../styles";

function Home({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <h1>ForTheMems</h1>
      {/* <hr/> */}
      {showLogin ? (
        <div className="form-box">
          <LoginForm setUser={setUser} />
          <hr/>
          <div className="form">
            Don't have an account?
            <br/>
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="form-box">
          <SignUpForm setUser={setUser} />
          <hr/>
          <div className="form">
            Already have an account?
            <br/>
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// const Logo = styled.h1`
//   font-family: "Permanent Marker", cursive;
//   font-size: 3rem;
//   color: deeppink;
//   margin: 8px 0 16px;
// `;

// const div = styled.section`
//   max-width: 500px;
//   margin: 40px auto;
//   padding: 16px;
// `;

// const Divider = styled.hr`
//   border: none;
//   border-bottom: 1px solid #ccc;
//   margin: 16px 0;
// `;

export default Home;
