const path = require("path");
const {config,uploader} = require("cloudinary").v2;
const fs = require("fs");

const Obj_photo = require("../db/Obj_photo");

config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
})


const getPhotos = async (req, res) => {
  try {
    const pt = await Obj_photo.find().sort({_id : -1});
    // console.log(pt);
    res.json(pt);
  } catch (error) {
    res.status(500).json({ message: "Error while getting list of photos." });
  }
};

const postPhotos = async (req, res) => {
  try {
    // console.log(req.file);
    const { title, description } = req.body;
    if (!req.file)
      return res.status(202).json({
        message: "Only .png, .jpg and .jpeg format allowed!",
      });
    if (!req.owner || !req.name || !title || !description)
      return res.status(202).json({
        message: "You are not Authorized",
      });
    // console.log(req.file);
    const result = await uploader.upload(req.file.path);
    const dt = new Obj_photo({
      photo : result.secure_url,
      cloudinary_id: result.public_id,
      name: req.name,
      title: title,
      description: description,
      owner: req.owner,
    });
    const newPostData = await dt.save();
    res.status(200).json({
      newPostData,
      message: "Post created successfully...",
    });
  } catch (error) {
    res.status(401).json({
      message: "photos error....",
    });
  }
};

const deletePhotos = async (req, res) => {
  try {
    const id = req.params.id;
    const check = await Obj_photo.findOne({ _id: id });
    if (!check)
      res.status(400).json({
        message: "this id not found",
      });
    if (check.owner !== req.owner)
      return res.status(404).json({
        message: "You Can't Delete",
      });
    
      
      await Obj_photo.deleteOne({ _id: id });
      await uploader.destroy(check.cloudinary_id);
    // fs.unlink(path.join(__dirname, `./../upload/images/${check.photo}`), () => {
    //   console.log("file deleted successfully....");
    // });
    // console.log(deleted);
    // console.log(check);
    res.status(202).json(check);
  } catch (error) {
    res.status(500).json({
      message: "Error in delete photo",
    });
  }
};

const patchPhotosUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const check = await Obj_photo.findById(id);
    if (!check)
      return res.status(400).json({
        message: "Error in updated id",
      });
    if (check.owner !== req.owner)
      return res.status(404).json({
        message: "You Can't update post",
      });
    const updatableData = {};
    if (req.body.creator) updatableData.creator = req.body.creator;
    if (req.body.title) updatableData.title = req.body.title;
    if (req.body.description) updatableData.description = req.body.description;
    if (req.file) {
      // fs.unlink(
      //   path.join(__dirname, `./../upload/images/${check.photo}`),
      //   () => {
      //     console.log("file updated successfully....");
      //   }
      //);
      //updatableData.photo = req.file.filename;
      // console.log(req.file.path);
      await uploader.destroy(check.cloudinary_id);
      const result = await uploader.upload(req.file.path);
      updatableData.photo = result.secure_url;
      updatableData.cloudinary_id = result.public_id;
    }
    // console.log(updatableData);
    const ad = await Obj_photo.findByIdAndUpdate(id, updatableData, {
      new: true,
    });
    res.status(202).json(ad);
  } catch (error) {
    res.status(404).json({
      message: "Error in update id",
    });
  }
};

const pathPhotosLike = async (req, res) => {
  try {
    // console.log(req.owner);
    const id = req.params.id;
    // console.log(id);
    const check = await Obj_photo.findOne({ _id: id });
    if (!check)
      res.status(400).json({
        message: "this id not found",
      });
    // if(check.owner !== req.owner) return res.status(404).json({
    //   message : "You Can't Like"
    // })
    // console.log(id);
    const index = check.likeCount.indexOf(req.owner);
    // console.log(index);
    if (index === -1) check.likeCount.push(req.owner);
    else check.likeCount.splice(index, 1);
    const updated = await Obj_photo.findByIdAndUpdate(id, check, { new: true });
    // console.log(updated);
    res.status(202).json(updated);
  } catch (error) {
    res.status(404).json({
      message: "Error with likeCount",
    });
  }
};

const getcommentData = async (req,res) => {
  try {
    const id = req.params.id;
    // console.log("hi");
    // console.log(id);
    if(!id) return res.status(202).json({
      message : "comment posts doesn't exists"
    })
    if( !req.owner) return res.status(202).json({
      message : "please Sign IN"
    })
    const sdt = await Obj_photo.findById(id);
    if(!sdt) return res.status(202).json({
      message : "Invalid posted comment"
    })
    // console.log("sdt");
    // console.log(sdt);
    res.status(200).json({sdt});
  } catch (error) {
    return res.status(404).json({
      message : "YOu can't comment"
    })
  }
}

const writeComment = async (req, res) => {
  try {
    if (!req.owner)
      return res.status(202).json({
        message: "Plese Sign In.",
      });
    const { id, comment } = req.body;
    // console.log(id);
    if (!comment || !id)
      return res.status(202).json({
        message: "please write comment.",
      });
    const check = await Obj_photo.findById(id);
      // console.log(check);
    if (!check)
      return res.status(202).json({
        message: "Not found post to be comment",
      });
    // let index = -1
    check.jsonComment.unshift({
      commentId: req.owner,
      commentName: req.name,
      comment: comment,
    });
    const newComment = await Obj_photo.findByIdAndUpdate(id, check, {
      new: true,
    });
    // console.log(newComment);
    return res.status(200).json({
      newComment,
      message: "successfully commented...",
    });
  } catch (error) {
    res.status(404).json({
      message: "you cannot write Comment.",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    if (!req.owner)
      return res.status(202).json({
        message: "Plese Sign In.",
      });
    const { id } = req.body;
    if (!id)
      return res.status(202).json({
        message: "You are not authorized.",
      });
    const check = await Obj_photo.findById(id);

    if (!check)
      return res.status(202).json({
        message: "Not found post to be delete comment",
      });
      // console.log(id,check);
    let index = -1;
    check.jsonComment.map((dt, i) => {
      if (dt.commentId === req.owner) index = i;
      return;
    });
    if (index != -1) check.jsonComment.splice(index, 1);
  
    const newComment = await Obj_photo.findByIdAndUpdate(id, check, {
      new: true,
    });
    return res.status(200).json({
      newComment,
      message: "Your comment deleted...",
    });
  } catch (error) {
    res.status(404).json({
      message: "you cannot delete Comment.",
    });
  }
};

module.exports = {
  getPhotos,
  postPhotos,
  deletePhotos,
  patchPhotosUpdate,
  pathPhotosLike,
  writeComment,
  deleteComment,
  getcommentData,
};
