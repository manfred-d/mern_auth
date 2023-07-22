import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// user login
// route POST /api/users/auth
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(401).json({ message: 'Invalid Email or Password' });
        // throw new Error('Invalid email or password');
    }
   
});

// user register
// route POST /api/users/regiser
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // empty fields
    if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are required' })
    }
    // check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        // throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(400).json({ message: 'All fields are required' });
        // throw new Error('Invalid User data');
    }


});

// user logout
// route POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logout user" })

});

// user profile
// route GET /api/users/profile
const getUser = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email:req.user.email
    }

    res.status(200).json(user);
    

});

// user update profile
// route PUT /api/users/profile
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error('User not Found');
    }
    res.status(200).json({ message: "Update user profile" })

});

export {
    authUser,
    registerUser,
    logoutUser,
    getUser,
    updateUser
}