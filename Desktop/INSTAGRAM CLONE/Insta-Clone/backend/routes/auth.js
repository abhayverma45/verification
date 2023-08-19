const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")
const {Jwt_secret} = require("../keys");
const requireLogin = require("../middlewares/requireLogin");

router.get("/", (req, res) => {
  res.send("hello");
});
 
router.get("/createpost",requireLogin,(req,res)=>{
  console.log("hello from auth")
})

// sign_up api

router.post("/signup", (req, res) => {
  const { Name, UserName, Email, Password } = req.body;
  if (!Name || !UserName || !Email || !Password) {
    return res.status(422).json({ erroe: "please add all the fields" });
  }

  USER.findOne({ $or: [{ Email: Email }, { UserName: UserName }] }).then(
    (saveduser) => {
      if (saveduser) {
        return res
          .status(422)
          .json({ error: "user already exist with that email or username" });
      }
      bcrypt.hash(Password, 12).then((hashedPassword) => {
        const User = new USER({
          Name,
          UserName,
          Email,
          Password: hashedPassword,
        });

        User.save()
          .then((User) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

// sign_in api
router.post("/signin", (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(422).json({ error: "Please add email and password" });
  }
  USER.findOne({ Email: Email }).then((saveduser) => {
    if (!saveduser) {
      return res.status(422).json({ error: "Invalid Email" });
    }
    bcrypt
      .compare(Password, saveduser.Password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({message:"signed in successfully"});
          const token=jwt.sign({_id:saveduser.id},Jwt_secret)
          const {_id,Name,Email,UserName}=saveduser;
          res.json({token,user:{_id,Name,Email,UserName}})
          console.log({token,user:{_id,Name,Email,UserName}})
        } else {
          return res.status(422).json({ error: "Invalid Password" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
