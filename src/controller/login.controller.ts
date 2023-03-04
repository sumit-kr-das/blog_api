import { Request, Response } from "express";
import pool from "../utils/connection";

const loginController = async (req: Request, res: Response) => {
	try {
		res.status(200).json("login");
	} catch (err: any) {
		return res.status(400).json({ msg: err.message });
	}
};

export default loginController;
