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

// Get Autobot by ID
router.get(
    '/autobot/:id',
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
            const autobot = await Autobot.findOne({ where: { id: req.params.id } });
            if (!autobot) {
                return res.status(404).json({ success: false, message: `Autobot with ID ${req.params.id} not found.` });
            }
            res.json({ success: true, data: autobot });
        } catch (error) {
            logger.error(`Error fetching Autobot ${req.params.id}: ${error.message}`);
            res.status(500).json({ success: false, message: "An error occurred while fetching the Autobot.", error: error.message });
        }
    }
);


// Get Post by ID
router.get(
    '/post/:id',
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
            const post = await Post.findOne({ where: { id: req.params.id } });
            if (!post) {
                return res.status(404).json({ success: false, message: `Post with ID ${req.params.id} not found.` });
            }
            res.json({ success: true, data: post });
        } catch (error) {
            logger.error(`Error fetching post ${req.params.id}: ${error.message}`);
            res.status(500).json({ success: false, message: "An error occurred while fetching the post.", error: error.message });
        }
    }
);


// Get Comment by ID
router.get(
    '/comment/:id',
    apiLimiter,
    [
        check('id').isInt().withMessage('Comment ID must be a valid number'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const comment = await Comment.findOne({ where: { id: req.params.id } });
            if (!comment) {
                return res.status(404).json({ success: false, message: `Comment with ID ${req.params.id} not found.` });
            }
            res.json({ success: true, data: comment });
        } catch (error) {
            logger.error(`Error fetching comment ${req.params.id}: ${error.message}`);
            res.status(500).json({ success: false, message: "An error occurred while fetching the comment.", error: error.message });
        }
    }
);


export default router;
