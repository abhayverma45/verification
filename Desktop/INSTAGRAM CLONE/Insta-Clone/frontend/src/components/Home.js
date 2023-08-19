import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }
    // fetchin all the post
    fetch("http://localhost:8000/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setdata(result))
      .catch((err) => console.log(err));
  }, []);

  // fetching all likes

  const likePost = (id) => {
    fetch("http://localhost:8000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:8000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="home">
      {/* card */}
      {data.map((post) => {
        return (
          <div className="card">
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682125220008-006e43a6896a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29uJTIwc3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                  alt=""
                ></img>
              </div>
              <h5>{post.postedBy.Name}</h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={post.photo} alt=""></img>
            </div>
            {/* card content */}
            <div className="card-content">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                    likePost(post._id);
                  }}
              >
                favorite
              </span>
              <span
                className="material-symbols-outlined material-symbols-outlined-red"
                onClick={() => {
                    unlikePost(post._id);
                  }}
              >
                favorite
              </span>
              <p1>1 like</p1>
              <p>{post.body}</p>
            </div>
            <div className="add-comment">
              <span class="material-symbols-outlined">mood</span>
              <input type="text" placeholder="add a comment"></input>
              <button className="comment">Post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
