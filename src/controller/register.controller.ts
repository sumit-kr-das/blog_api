import { Request, Response } from 'express';
import pool from '../utils/connection';

// Math.floor(1000 + Math.random() * 9000)

const registerController = async (req: Request, res: Response) => {
    const { name, email, password, school_name, avatar, details } = req.body;

    const user_name =
        name.split(' ')[0].toLowerCase() +
        Math.floor(1000 + Math.random() * 9000);

    try {
        const isExist = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        if (isExist.rowCount) {
            return res.status(200).send({
                success: false,
                message: 'User already registered',
            });
        }
        const newUser = await pool.query(
            `INSERT INTO users 
            (name, user_name, email, password, school_name, avatar, details) VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING name, user_name, email, password, school_name, avatar, details`,
            [name, user_name, email, password, school_name, avatar, details]
        );
        res.status(200).json(newUser.rows);
    } catch (err: any) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};

export default registerController;
