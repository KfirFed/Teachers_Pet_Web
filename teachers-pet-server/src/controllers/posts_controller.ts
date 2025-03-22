import PostModel from "../models/posts_model";

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPostsBySenderId = async (req, res) => {
  const sender = req.query.sender;

  try {
    const posts = await PostModel.find({ senderId: sender });
    if (posts.length === 0) {
      res.status(404).send("Post not found");
    } else {
      res.send(posts);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePostById = async (req, res) => {
  const postId = req.params.id;
  const postBody = req.body;

  try {
    await PostModel.findByIdAndUpdate(postId, postBody);
    res.status(200).send("Post updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleLikeClick = async (req, res) => {
  const postId = req.params.id;
  const senderId = req.body.senderId;

  try {
    const post = await PostModel.findById(postId);
    let likes = post.likes;

    if (likes.includes(senderId)) {
      likes = likes.filter((id) => id !== senderId);
      try {
        const post = await PostModel.findById(postId);
        post.likes = likes;
        await PostModel.findByIdAndUpdate(postId, post);
        res.status(200).send("Like removed");
      } catch (error) {
        res.status(400).send(error.message);
      }
    } else {
      likes.push(senderId);
      try {
        await PostModel.findByIdAndUpdate(postId, { likes });
        res.status(200).send("Like removed");
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getAllPosts,
  createPost,
  getPostById,
  getAllPostsBySenderId,
  updatePostById,
  handleLikeClick,
};
