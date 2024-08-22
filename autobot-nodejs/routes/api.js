import express from 'express';
import Autobot from '../models/Autobot.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import expressRateLimit from 'express-rate-limit';

const router = express.Router();

const apiLimiter = expressRateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many requests, please try again later.",
});

// Get Autobots
router.get('/autobots', apiLimiter, async (req, res) => {
  const autobots = await Autobot.findAll({ limit: 10 });
  res.json(autobots);
});

// Get an Autobot's Posts
router.get('/autobot/:id/posts', apiLimiter, async (req, res) => {
  const posts = await Post.findAll({ where: { userId: req.params.id }, limit: 10 });
  res.json(posts);
});

// Get Post Comments
router.get('/post/:id/comments', apiLimiter, async (req, res) => {
  const comments = await Comment.findAll({ where: { postId: req.params.id }, limit: 10 });
  res.json(comments);
});

export default router;
