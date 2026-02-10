import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";
import express from "express";


/* register */
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // generate token
        const token = generateToken(user._id);

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });

        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(0)
        });


        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // compare password

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },

        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.json({
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
};

