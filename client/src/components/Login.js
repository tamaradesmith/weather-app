import React from 'react';


import { User } from "../js/requests";
import { Redirect } from 'react-router-dom';

function Login(props) {

  async function handleLogin(event) {
    event.preventDefault()
    const form = document.querySelector("#login");
    const formData = new FormData(form);
    const user = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    const result = await User.login(user)
    if (!result.result) {
      document.querySelector("#error").innerText = result.message;
      document.querySelector("#error").classList.remove('hidden');
    } else {
      console.log("redirect")
      props.history.push(`/site`)
    }
  }

  return (
    <form id="login">
      <p id="error" className="hidden"></p>
      <label htmlFor="email" >Email</label>
      <input type="text" name="email" placeholder="Enter your email"></input>

      <label htmlFor="password">Password</label>
      <input type="password" name="password"></input>
      <button type="submit" onClick={handleLogin}>Login</button>
    </form>
  );
};

export default Login;