import React from 'react';

import '../styles/user.css';

import { User } from "../js/requests";

function Login(props) {

  async function handleLogin(event) {
    event.preventDefault()
    const form = document.querySelector("#login");
    const formData = new FormData(form);
    const user = {
      username: formData.get('username'),
      password: formData.get('current_password'),
    }
    console.log("handleLogin -> user", user);
    const result = await User.login(user)
    if (!result.result) {
      document.querySelector("#error").innerText = result.message;
      document.querySelector("#error").classList.remove('hidden');
    } else {
      console.log('login in')
      props.history.push(`/site`)
    }
  }

 async function handle(event){
    event.preventDefault()

    const result =  await User.user(2);
    console.log("handle -> result", result);
    
  }

  return (
    <div className='Login'>

    <form id="login" className='login-form'>
      <p id="error" className="hidden"></p>
      <label htmlFor="username" >Username</label>
      <input type="text" name="username" placeholder="Enter your username"></input>


      <label htmlFor="password">Password</label>
      <input type="password" name="current_password"></input>
      <button type="submit" onClick={handleLogin} className="login-button">Login</button>
    </form>
    </div>
  );
};

export default Login;