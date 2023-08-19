import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const notify = (msg) => toast.error(msg);
  const notifyb = (msg) => toast.success(msg);

  useEffect(() => {
    //   saving post to mongodb
    if (url) {
      fetch("http://localhost:8000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notify(data.error);
          } else {
            notifyb("successfully posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudinary
  const postDetail = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "Abhay45");
    fetch("https://api.cloudinary.com/v1_1/Abhay45/image/upload", {
      method: "post",
      body: data
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="create-post">
      {/* header */}
      <div className="header">
        <h4
          style={{
            margin: "3px auto",
          }}
        >
          create new Post
        </h4>
        <button
          onClick={() => {
            postDetail();
          }}
          id="post-btn"
        >
          share
        </button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://img.freepik.com/vetores-premium/icone-da-galeria-paisagem-de-imagens-simbolo-de-sinal-de-vetor_660702-224.jpg"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        ></input>
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://plus.unsplash.com/premium_photo-1682125220008-006e43a6896a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29uJTIwc3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              alt=" "
            ></img>
          </div>
          <h5>Ramesh</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="right a caption"
        ></textarea>
      </div>
    </div>
  );
}
