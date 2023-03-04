import express, { Request, Response } from "express";
import pool from '../utils/connection';

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
    pool.query("SELECT * FROM posts", (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    })
});

router.get("/:id", (req:Request, res:Response) => {
    const id = req.params.id

    pool.query("SELECT * FROM posts WHERE id = $1",[id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    })
});

router.post("/", (req:Request, res:Response) => {
    const {title, posts, publish_date, author_name} = req.body;
    try {
        pool.query("INSERT INTO posts (title, posts, publish_date, author_name) VALUES ($1,$2,$3,$4)",[title, posts, publish_date, author_name], (err, results) => {
            if(err) throw err;
            res.status(200).json("POST POSTED");
        })
    }catch(err){
        console.log("err", err);
    }
});


export default router;