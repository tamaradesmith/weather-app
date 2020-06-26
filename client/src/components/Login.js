import React from 'react';

import '../styles/user.css';
import { Redirect } from 'react-router-dom';


function Login(props) {

  console.log("Login -> props", props);

  async function handle(event) {
    event.preventDefault()
    const form = document.querySelector("#login");
    const formData = new FormData(form);
    const user = {
      username: formData.get('username'),
      password: formData.get('current_password'),
    }
    const result = await props.handleLogin(user);
    console.log("handle -> result", result);
    if (!result.result) {
      document.querySelector("#error").innerText = result.message;
      document.querySelector("#error").classList.remove('hidden');
      // } else {
      //   return <Redirect to='/site' />
    }
  }

  return (
    <div className='Login'>

      <p id="error" className="hidden"></p>
      <form id="login" className='login-form'>
        <label htmlFor="username" >Username</label>
        <input type="text" name="username" placeholder="Enter your username"></input>


        <label htmlFor="password">Password</label>
        <input type="password" name="current_password"></input>
        <button type="submit" onClick={handle} className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;