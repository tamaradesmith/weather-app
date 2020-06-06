import React from 'react';


import { User } from "../js/requests";

function Login(props) {

  async function handleLogin(event) {
    event.preventDefault()
    const form = document.querySelector("#login");
    const formData = new FormData(form);
    const user = {
      email: formData.get('email'),
      password: formData.get('current_password'),
    }
    const result = await User.login(user)
    if (!result.result) {
      document.querySelector("#error").innerText = result.message;
      document.querySelector("#error").classList.remove('hidden');
    } else {
      props.history.push(`/site`)
    }
  }

 async function handle(event){
    event.preventDefault()

    const result =  await User.user(2);
    console.log("handle -> result", result);
    
  }

  return (
    <div>

    <form id="login">
      <p id="error" className="hidden"></p>
      <label htmlFor="email" >Email</label>
      <input type="text" name="email" placeholder="Enter your email"></input>


      <label htmlFor="password">Password</label>
      <input type="password" name="current_password"></input>
      <button type="submit" onClick={handleLogin}>Login</button>
    </form>
    <button onClick={handle}> Click</button>
    </div>
  );
};

export default Login;