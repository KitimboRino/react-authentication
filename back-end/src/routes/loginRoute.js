import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const loginRoute = {
    path: '/api/login',
    method: 'post',

    handler: async (req, res) => {
        // Email and password user is submitting from client side
        const { email, password } = req.body;

        // Connectino to the database
        const db = getDbConnection('react-auth-db');

        // Finding the user in the database with email
        const user = await db.collection('users').findOne({ email });

        if (!user) return res.sendStatus(401)

        const { _id: id, isVerified, passwordHash, info } = user;

        // Comparing the password the user is submitting with the passwordhash in the database
        const isCorrect = await bcrypt.compare(password, passwordHash)

        if (isCorrect) {
            jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    res.status(500).json(err);
                }
                res.status(200).json({ token });
            });
        } else {
            res.sendStatus(401);
        }
    }
}