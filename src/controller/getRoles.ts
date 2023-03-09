import { Request, Response, NextFunction } from 'express';
import pool from '../utils/connection';

const roles = {
    admin: 220,
    user: 120,
};

export default async function getRoles( req: any, res: Response, next: NextFunction ) {
    try {
        const user_id = req.user.id;
        const usr_details = await pool.query(
            `SELECT u.id, r.name
            FROM users as u, user_roles as u_r, roles as r
            WHERE u.id = u_r.user_id and r.id = u_r.role_id and u.id = $1`,
            [user_id]
        );
        if(!usr_details.rowCount) {
            return res.status(200).send({
                success: false,
                message: 'unauthorized user',
            });
        }

        let user_role = usr_details.rows[0].name
        let set_roles: number = null || 0;

        for (const role of Object.entries(roles)) {
            if (role[0] === user_role) {
                set_roles = role[1];
            }
        }
        res.status(200).json({ roles: set_roles });
    } catch (err: any) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
}
