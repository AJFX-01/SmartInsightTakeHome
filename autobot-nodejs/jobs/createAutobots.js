import axios from 'axios';
import Autobot from '../models/Autobot.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { v4 as uuidv4 } from 'uuid';

const BATCH_SIZE = 100; // Adjust based on your server's capacity

const createAutobotsBatch = async (batchSize) => {
    try {
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = userResponse.data;
        console.log(users);

        let autobots = [];
        let posts = [];
        let comments = [];

        for (let i = 0; i < batchSize; i++) {
            const baseUser = users[Math.floor(Math.random() * users.length)];
            const randomSuffix = uuidv4().slice(0, 6);
            const randomUsername = `${baseUser.username}_${randomSuffix}`;
            const randomEmail = `${randomSuffix}@${baseUser.email.split('@')[1]}`;
            const randomPhone = `${baseUser.phone}-${Math.floor(Math.random() * 1000)}`;

            const autobot = {
                name: `${baseUser.name} ${randomSuffix}`,
                username: randomUsername,
                email: randomEmail,
                phone: randomPhone,
                website: `${randomSuffix}.${baseUser.website}`,
            };

            autobots.push(autobot);

            for (let j = 0; j < 10; j++) {
                const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const postData = postResponse.data[Math.floor(Math.random() * postResponse.data.length)];

                let postTitle = `${postData.title} - ${randomSuffix}`;
                const post = {
                    title: postTitle,
                    body: postData.body,
                    userId: i + 1, // Temporary, will replace with actual Autobot ID after insertion
                };

                posts.push(post);

                for (let k = 0; k < 10; k++) {
                    const commentResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
                    const commentData = commentResponse.data[Math.floor(Math.random() * commentResponse.data.length)];

                    const comment = {
                        name: `${commentData.name} ${randomSuffix}`,
                        email: `${randomSuffix}@${commentData.email.split('@')[1]}`,
                        body: commentData.body,
                        postId: j + 1, // Temporary, will replace with actual Post ID after insertion
                    };

                    comments.push(comment);
                }
            }
        }

        // Insert Autobots in bulk
        const createdAutobots = await Autobot.bulkCreate(autobots, { returning: true });

        // Update userId in posts to match the created Autobots
        posts.forEach((post, index) => {
            post.userId = createdAutobots[Math.floor(index / 10)].id;
        });

        // Insert Posts in bulk
        const createdPosts = await Post.bulkCreate(posts, { returning: true });

        // Update postId in comments to match the created Posts
        comments.forEach((comment, index) => {
            comment.postId = createdPosts[Math.floor(index / 10)].id;
        });

        // Insert Comments in bulk
        await Comment.bulkCreate(comments);
    } catch (e) {
        console.error('Error in creating Autobots batch:', e);
        throw new Error
    }
};

// Process Autobots in batches
export const processAutobotsInBatches = async () => {
    const totalAutobots = 500;
    const numBatches = Math.ceil(totalAutobots / BATCH_SIZE);

    for (let i = 0; i < numBatches; i++) {
        await createAutobotsBatch(BATCH_SIZE);
    }
};

