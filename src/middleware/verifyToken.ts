import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export function verifyToken(req: any, res: Response, next: NextFunction) {
    const JWT_SECRET = config.get<string>('JWT_SECRET');
    const authHeader = req?.headers?.authorization;
    if (!req.headers || !authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            success: false,
            message: 'unauthorized user',
        });
    }
    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'unauthorized user',
                });
            }
            req.user = user;
            next();
        });
    } catch (err: any) {
        return res.status(401).send({
            success: false,
            message: err.message,
        });
    }
}

export function verifyUser(req: any, res: Response, next: NextFunction) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).send({
                success: false,
                message: 'unauthorized user',
            });
        }
    });
}

export function verifyAdmin(req: any, res: Response, next: NextFunction) {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).send({
                success: false,
                message: 'unauthorized user',
            });
        }
    });
}
