import React, { useState } from "react";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [address, setaddress] = useState("");
  const [otp, setotp] = useState("");
  const [isphoneverified, setisphoneverified] = useState(false);
  const [isrequestedotp, setisrequestedotp] = useState(false);

  const sendotp = async () => {
    try {
      setisrequestedotp(true);
    } catch (error) {
      console.log(error);
    }
  };
  const verifyotp = async () => {
    try {
      setisphoneverified(true);
      toast.success(`ypur otp verified`);
    } catch (error) {
      console.log(error);
    }
  };

  const submitDetail = async () => {
    try {
      if (isphoneverified === false) {
        return toast.warning("please varify your number first");
      } else {
        alert("your detail submited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row g-6  ">
        <form>
          <div className="col-auto">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              className="input-sm"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              type="text"
              className="input-sm"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Contact
            </label>
            <input
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
              type="number"
              className="input-sm"
            />
          </div>
          {isrequestedotp === true ? (
            <>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Enter OTP sent to Phone Number
                </label>
                <input
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  type="number"
                  className="input-sm"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <button
                  onClick={() => verifyotp()}
                  type="button"
                  className="btn btn-primary"
                >
                  Verify OTP
                </button>
              </div>
            </>
          ) : (
            <div className="mb-3">
              <button
                onClick={() => sendotp()}
                type="button"
                className="btn btn-danger"
              >
                Send OTP
              </button>
            </div>
          )}

          <div className="mb-3">
            <button
              type="submit"
              onClick={() => submitDetail()}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
