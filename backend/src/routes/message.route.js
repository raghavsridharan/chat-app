import express from "express";
import { getUsersforsiderbar, getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get('/user', protectRoute, getUsersforsiderbar); // seeing users on the side bar in the message
router.get('/:id', protectRoute, getMessages); // get messages between two users
router.post('/send/:id', protectRoute, sendMessage); // send message between two users

export default router;