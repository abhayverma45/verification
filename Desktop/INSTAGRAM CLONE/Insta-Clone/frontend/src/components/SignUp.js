import React, { useState } from "react";
import logo from "../img/logo.png";
import "./SignUp.css";
import "../App.css";
import { Link,useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function SignUp() {
  const navigate=useNavigate()
  const [Name, setName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const emailRegix=/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
  const passRegix=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

  // toast fuction
  const notify = (msg) => toast.error(msg);
  const notifyb= (msg) => toast.success(msg);
  
  const postData = () => {
    // sending data to server
    if(!emailRegix.test(Email)){
      notify("Invalid email")
      return
    }else if(!passRegix.test(Password)){
      notify("password that has at least 1 lowercase letter, 1 uppercase letter, one digit, 1 special character, and is at least 8 characters")
      return
    }
    fetch("http://localhost:8000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: Name,
        UserName: UserName,
        Email: Email,
        Password: Password,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.error) {
          notify(data.error)
        }
        else{
          notifyb(data.message)
          navigate("/signin")
        }
        console.log(data);
      });
  };

  return (
    <div className="SignUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt=" " />
          <p className="loginPara">
            signup to see phots and videos <br />
            from your friends
          </p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="FullName"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="UserName"
              value={UserName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className="loginPara">
            {" "}
            By signing up,you agree to our Terms,
            <br />
            privacy policy and cookies police
          </p>
          <input
            type="submit"
            id="submit-btn"
            value="Sign Up"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <div className="form2">
          already have ab account?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
