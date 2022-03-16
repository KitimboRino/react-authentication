import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getDbConnection } from '../db';


export const signUpRoute = {
    path: '/api/sign',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Default values for user
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        // Creating a new user in the database
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false
        });

        // Getting Id from the result
        const { insertedId } = result;

        // Generating a token to be used by client
        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false
        },
            process.env.JWT_SECRET,
            // How long the jwt will last
            {
                expiresIn: '2d',
            },

            // Callback function whrn jwt is ready
            (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            }
        )

    }
}