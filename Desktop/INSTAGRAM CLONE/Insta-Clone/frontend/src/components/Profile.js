import React from "react";
import "./Profile.css";
import { useEffect } from "react";
import { useState } from "react";

export default function Profile() {
  const [pic, setpic] = useState([])
  useEffect(() => {
    fetch("http://localhost:8000/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((res) => res.json())
      .then((result)=>{setpic(result)})
      console.log(pic)
  }, []);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            src="https://plus.unsplash.com/premium_photo-1682125220008-006e43a6896a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29uJTIwc3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          ></img>
        </div>
        {/*profile data  */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).Name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>40 post</p>
            <p>40 follower</p>
            <p>40 following</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "90%",
          margin: "25px auto",
          opacity: "0.8",
        }}
      ></hr>
      {/* profile gallary */}
      <div className="profile-gallary">
        {pic.map((pics)=>{
return <img key={pics._id} src={pics.photo} className="item"></img>
        })}
      </div>
    </div>
  );
}
