import express from 'express';
import Autobot from '../models/Autobot.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import expressRateLimit from 'express-rate-limit';
import { check, validationResult } from 'express-validator';
import logger from '../utils/logger.js';

const router = express.Router();

const apiLimiter = expressRateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many requests, please try again later.",
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again after a minute.",
    });
  },
});

// Get Autobots
router.get('/autobots', apiLimiter, async (req, res) => {
  try {
    const autobots = await Autobot.findAll({ limit: 10 });
    if (autobots.length === 0) {
      return res.status(404).json({ success: false, message: "No Autobots found." });
    }
    res.json({ success: true, data: autobots });
  } catch (error) {
    logger.error(`Error fetching Autobots: ${error.message}`);
    res.status(500).json({ success: false, message: "An error occurred while fetching Autobots.", error: error.message });
  }
});

// Get an Autobot's Posts
router.get(
  '/autobot/:id/posts',
  apiLimiter,
  [
    check('id').isInt().withMessage('Autobot ID must be a valid number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const posts = await Post.findAll({ where: { userId: req.params.id }, limit: 10 });
      if (posts.length === 0) {
        return res.status(404).json({ success: false, message: `No posts found for Autobot with ID ${req.params.id}.` });
      }
      res.json({ success: true, data: posts });
    } catch (error) {
      logger.error(`Error fetching posts for Autobot ${req.params.id}: ${error.message}`);
      res.status(500).json({ success: false, message: "An error occurred while fetching posts.", error: error.message });
    }
  }
);

// Get Post Comments
router.get(
  '/post/:id/comments',
  apiLimiter,
  [
    check('id').isInt().withMessage('Post ID must be a valid number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const comments = await Comment.findAll({ where: { postId: req.params.id }, limit: 10 });
      if (comments.length === 0) {
        return res.status(404).json({ success: false, message: `No comments found for post with ID ${req.params.id}.` });
      }
      res.json({ success: true, data: comments });
    } catch (error) {
      logger.error(`Error fetching comments for post ${req.params.id}: ${error.message}`);
      res.status(500).json({ success: false, message: "An error occurred while fetching comments.", error: error.message });
    }
  }
);

export default router;


// import express from 'express';
// import Autobot from '../models/Autobot.js';
// import Post from '../models/Post.js';
// import Comment from '../models/Comment.js';
// import expressRateLimit from 'express-rate-limit';

// const router = express.Router();

// const apiLimiter = expressRateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 5,
//   message: "Too many requests, please try again later.",
// });

// // Get Autobots
// router.get('/autobots', apiLimiter, async (req, res) => {
//   const autobots = await Autobot.findAll({ limit: 10 });
//   res.json(autobots);
// });

// // Get an Autobot's Posts
// router.get('/autobot/:id/posts', apiLimiter, async (req, res) => {
//   const posts = await Post.findAll({ where: { userId: req.params.id }, limit: 10 });
//   res.json(posts);
// });

// // Get Post Comments
// router.get('/post/:id/comments', apiLimiter, async (req, res) => {
//   const comments = await Comment.findAll({ where: { postId: req.params.id }, limit: 10 });
//   res.json(comments);
// });

// export default router;
