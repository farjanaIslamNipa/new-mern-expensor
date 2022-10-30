import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
    // get all form data
    const { firstName, lastName, email, password } = req.body;
    // check if user exists with same email
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(406).json({ message: "User already exists." });
        return;
    }

    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await User({
         firstName,
         lastName, 
         email, 
         password:hashedPassword 
        })
    await user.save();
    res.status(201).json({ message: 'user is created'});
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user){
        res.status(406).json({ message: "Credentials not found" });
        return;
    }
    
    const matched = await bcrypt.compare(password, user.password);
    if(!matched){
        res.status(406).json({ message: "Credentials not found" });
        return;
    }

    // create jwt token
    const payload = {
        username: email,
        _id: user._id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({message: 'Token successfully created', token})

})

export default router;