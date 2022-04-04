import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && user.matchPassword(password)) {
        res.json({
            _id: user._id,
            token: generateToken(user._id),
            name: user.name,
            email: 'sakdjhasdhjaf',
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password,
    })
    if (user) {
        const token = generateToken(user._id)
        res.status(201).json({
            _id: user._id,
            token,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

export { authUser, getUserProfile, registerUser, getUsers }
