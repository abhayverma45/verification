const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");
// route
router.get("/allpost",requireLogin, (req, res) => {
  POST.find()
  .populate("postedBy","_id Name")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});
router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  console.log(pic);
  if (!body || !pic) {
    return res.status(422).json({ error: "please fill all the fields" });
  }

  console.log(req.user);
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/mypost",requireLogin,(req,res)=>{
  POST.find({postedBy:req.user._id})
  .populate("postedBy","_id Name")
  .then(mypost=>{
    res.json(mypost)
  })
})

router.put("/like", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id }
  }, {
      new: true
  })
      .then((err, result) => {
          if (err) {
              return res.status(422).json({ error: err })
          } else {
              res.json(result)
          }
      })
})

router.put("/unlike", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
  }, {
      new: true
  })
      .then((err, result) => {
          if (err) {
              return res.status(422).json({ error: err })
          } else {
              res.json(result)
          }
      })
})

module.exports = router;
