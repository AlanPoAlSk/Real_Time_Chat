const { UserModel } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET;

    return jwt.sign({_id}, jwtkey, {expiresIn: '3d'})
}
const authController = {
    register: async (req, res) => {
        try {
            // Extract user input from request body
            const { firstName, lastName, email, password, image } = req.body;

            console.log(req.body);

            // Check if any required field is missing
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            // Check if the user already exists
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            if(!validator.isEmail(email))
                return res.status(400).json({message: 'You must provide a valid Email'});
            // if(!validator.isStrongPassword(password))
            //     return res.status(400).json({message: 'You must provide a strong Password'});

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Validate the hashedPassword
            if (!hashedPassword) {
                return res.status(500).json({ message: 'Error hashing password' });
            }



            // Create a new user instance
            newUser = new UserModel({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                image,
            });

            // Save the new user to the database
            await newUser.save();
            const token = createToken()

            res.status(201).json({ message: 'User registered successfully', _id: newUser._id,firstName: firstName, lastName: lastName, email: email, token });
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ message: 'Error registering user', error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            // Extract login credentials from request body
            const { email, password } = req.body;

            // Find user by email
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Validate password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token for authentication
            const token = createToken(user._id)
            // Send token and user ID in response upon successful login
            res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email,
                token,
            });
        } catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ message: 'Error logging in', error: err.message });
        }
    },

    findUser: async(req,res) => {
        const userId = req.params.userId;
        try {
            const user = await UserModel.findById(userId)
            res.status(200).json(user);
    
        }   catch (err) {console.error( err);
            res.status(500).json({ error: err.message });
        }
    },
    
    getUsers: async(req,res) => {
        
        try {
            const users = await UserModel.find()
            res.status(200).json(users);
    
        }   catch (err) {console.error( err);
            res.status(500).json({ error: err.message });
        }
    }
};


module.exports = authController;
