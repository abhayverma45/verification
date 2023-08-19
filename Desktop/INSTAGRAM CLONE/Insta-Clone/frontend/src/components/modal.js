import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "./modal.css";
import { useNavigate } from "react-router-dom";

function Modal({setmodalOpen}) {
    const navigate=useNavigate();
  return (
    <div className="darkBG" onClick={()=>setmodalOpen(false)}>
      <div className="center">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button onClick={()=>setmodalOpen(false)} className="closeBtn">
            <RiCloseLine></RiCloseLine>
          </button>

          {/* modal content */}
          <div className="modalContent">are really want to logout?</div>

          <div className="modalActions">
            <div className="actionsContainer">
              <button className="logOutBtn"
              onClick={()=>{setmodalOpen(false);
                localStorage.clear()
                navigate("./signin")}}
              >log Out</button>
              <button className="cancelBtn" onClick={()=>setmodalOpen(false)}> cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
