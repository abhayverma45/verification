import React,{useState,useContext} from "react";
import "./SignIn.css";
import logo from "../img/logo.png";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/logincontext";

export default function SignIn() {
  const{setuserLogin}=useContext(LoginContext)
  const navigate=useNavigate()
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const emailRegix=/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

  // toast fuction
  const notify = (msg) => toast.error(msg);
  const notifyb= (msg) => toast.success(msg);

  const postData = () => {
    // sending data to server
    if(!emailRegix.test(Email)){
      notify("Invalid email")
      return
    }
    
    fetch("http://localhost:8000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       
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
          notifyb("Signed in successfully")
          console.log(data)
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user", JSON.stringify(data.user) )
          setuserLogin(true)
          navigate("/")
        }
        console.log(data);
      });
  };
  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUplogo" src={logo} alt=" "></img>
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
          <input type="submit" id="login-btn" value="Sign In" onClick={()=>{
            postData()
          }}></input>
        </div>

        <div className="loginForm2">
          Don't have an account?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
