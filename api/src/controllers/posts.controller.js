const Post = require("../models/posts.model");
const UploadFileModel = require("../models/uploadFile.model");
const PostLocation = require("../models/postLocation.model");
const uploadOneFileInAws = require("../utils/aws-s3");

const PostController = {
  async createPost(req, res) {
    const { title, content, uploadFiles } = req.body;

    try {
      const post = new Post({
        title,
        content,
      });

      const postLocation = new PostLocation({
        formatted_address: req.body.formatted_address,
        street_number: req.body.street_number,
        route: req.body.route,
        city: req.body.city,
        administrative_area_level_1: req.body.administrative_area_level_1,
        administrative_area_level_2: req.body.administrative_area_level_2,
        country: req.body.country,
        postal_code: req.body.postal_code,
        post: post._id,
      });
      post.postLocation = postLocation._id;

      await postLocation.save();
      await post.save();

      const uploadFilesPromises = req.files.map((file) =>
        uploadOneFileInAws(file, post._id)
      );
      const uploadFilesData = await Promise.all(uploadFilesPromises);

      const uploadFiles = uploadFilesData.map(async (file) => {
        const uploadFile = new UploadFileModel({
          ETag: file.ETag,
          ServerSideEncryption: file.ServerSideEncryption,
          Location: file.Location,
          key: file.key,
          Key: file.Key,
          Bucket: file.Bucket,
          post: post._id,
        });
        post.uploadFiles.push(uploadFile);
        await uploadFile.save();
      });
      await post.save();

      res.status(201).send(post);
    } catch (err) {
      res.status(409).send({ message: err.message });
    }
  },
  async getPosts(req, res) {
    try {
      const posts = await Post.find()
        .populate("uploadFiles")
        .populate("postLocation");
      res.send(posts);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
  async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id)
        .populate("uploadFiles")
        .populate("postLocation");
      res.send(post);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      post.title = req.body.title;
      post.content = req.body.content;
      const updatedPost = await post.save();
      res.send(updatedPost);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.send({ message: "Post deleted" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
};

module.exports = PostController;
