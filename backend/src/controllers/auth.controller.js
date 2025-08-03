import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// Signup controller
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate cookie with JWT
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullName,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout controller
export const logout = (req, res) => {   
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try{
        const {profilePic}  = req.body;
        const user_id = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        return res.status(200).json(updatedUser);

    }catch(error){
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async (req, res) => { 
    try{
        res.status(200).json(req.user);

    }catch{
        console.error("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}