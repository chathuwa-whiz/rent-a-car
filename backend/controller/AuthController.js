import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//CREATE USER

export const register = async(req, res) => {

    const { firstName, lastName, phone, secondaryPhone, nic, address, email, password } = req.body;

    try {

        const user = new User({

            firstName,
            lastName,
            phone,
            secondaryPhone,
            nic,
            address,
            email,
            password
        });

        const existingUser = await User.find({ email});
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await user.save();



        res.status(201).json({ 
            message: 'User registered successfully',
            user, role
        });

    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

//LOGIN

export const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        if(!token) {
            return res.status(400).json({ message: 'Token not generated' });
        }
        
        res.status(201).json({ 
            message: 'Login successful',
            user: {id: user._id, role: user.role},
            token
         });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};