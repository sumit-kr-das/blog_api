import { Request, Response } from 'express';
import pool from '../utils/connection';
import bcrypt from 'bcrypt';

const registerController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
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

        const salt = bcrypt.genSaltSync(10);
        const hash_password = bcrypt.hashSync(password, salt);

        const newUser = await pool.query(
            `INSERT INTO users 
            (name, user_name, email, password) VALUES
            ($1,$2,$3,$4)
            RETURNING users.id`,
            [name, user_name, email, hash_password]
        );
        const new_user_id = newUser.rows[0].id;
        try {
            await pool.query(
                `INSERT INTO user_roles
                (user_id, role_id) VALUES
                ($1, $2)`,
                [new_user_id, 2]
            );
            res.status(200).json({ msg: "user registered successfully" });
        } catch (err: any) {
            return res.status(400).send({
                success: false,
                message: err.message,
            });
        }
    } catch (err: any) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};

export default registerController;
