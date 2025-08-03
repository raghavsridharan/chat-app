import express from "express";

const router = express.Router();
router.get('/user', protectedRoute, getUsersforsiderbar) //seeing users on the side bar in the message
router.get('/:id', protectedRoute, getMessages); // get messages between two users
router.post('/send/:id', protectedRoute, sendMessage); // send message between two users
export default router;