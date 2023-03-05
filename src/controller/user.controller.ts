import { Request, Response } from 'express';
import pool from '../utils/connection';

export default async function (req: Request, res: Response) {
    try {
        const users = await pool.query(`SELECT * FROM users`);
        res.status(200).json(users.rows);
    } catch (err: any) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}
