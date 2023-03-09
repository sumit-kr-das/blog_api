import { Request, Response } from 'express';
import pool from '../utils/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const JWT_SECRET = config.get<string>('JWT_SECRET');
    try {
        const isExist = await pool.query(
            `SELECT id, email, password
            FROM users
            WHERE users.email = $1;`,
            [email]
        );

        if (!isExist.rowCount) {
            return res.status(200).send({
                success: false,
                message: 'user not registered',
            });
        }

        const new_user_id = isExist.rows[0].id;
        const new_user_pass = isExist.rows[0].password;

        const isPassCorrect = await bcrypt.compareSync(password, new_user_pass);

        if (!isPassCorrect) {
            return res.status(200).send({
                success: false,
                message: 'passwor is wrong',
            });
        }

        const generateToken = jwt.sign({ id: new_user_id }, JWT_SECRET, {
            expiresIn: '3d',
        });

        res.status(200).json({ access_token: generateToken });
    } catch (err: any) {
        return res.status(400).json({ msg: err.message });
    }
};

export default loginController;
