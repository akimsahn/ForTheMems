import React, { useState } from "react";

function SignUpForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then(user => setUser(user));
      } else {
        r.json().then(err => setErrors(err.errors));
      }
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Username: &nbsp;
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </label>
      <br/>
      <label>Password: &nbsp;
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="Enter password"
        />
      </label>
      <br/>
      <label>Confirm Password: &nbsp;
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
          placeholder="Confirm password"
        />
      </label>
      <br/>
      <button type="submit">
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
      {errors.map((err) => (
        <p className="error">{err}</p>
      ))}
    </form>
  );
}

export default SignUpForm;
