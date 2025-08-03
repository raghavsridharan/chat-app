import jwt from "jsonwebtoken"
const generateToken = (userId, response) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : "7d"
    })

    //http cookie

    response.cookie("jwt", token, {
        maxAge : 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
        httpOnly : true,                    // Cannot be accessed by client-side JavaScript
        sameSite : "strict",               // Cookie only sent to same site
        secure : process.env.NODE_ENV !== 'development'  // Requires HTTPS in production
    })

    return token

}

export default generateToken;