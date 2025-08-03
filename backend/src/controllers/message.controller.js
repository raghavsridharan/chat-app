import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsersforsiderbar = async (req, res) => {
    try { 
        const loggedInUserId = req.user._id; // Assuming req.user is set by the protectRoute middleware
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password"); // Exclude the logged-in user and sensitive fields
        res.status(200).json(filteredUsers);

    }catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const getMessages = async (req, res) => {

    try {
        const {id : id} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({

            $or : [
               {sendermyId : myId, recieverId : id},
               {sendermyId : id, recieverId : myId} 
            ]

            
        })
        
        res.status(200).json(messages);// Assuming req.user is set by the protectRoute middleware

    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }


}

export const sendMessage = async (req, res) => {

    try {
        const {text, image} = req.body;
        const {id : recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image); // Assuming you have a function to handle image uploads
            imageUrl = uploadedImage.secure_url; // Get the secure URL of the uploaded image

        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch(error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}