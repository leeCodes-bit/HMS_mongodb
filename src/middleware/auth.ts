import { Request, Response, NextFunction } from "express-serve-static-core";
import jwt from 'jsonwebtoken';
import Doctor from "../models/doctorsModel"
import dotenv from 'dotenv';
dotenv.config();
const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    try{
        // using cookies for authorization
        const authorization = req.cookies.token; 
        // const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(401).json({Error: "Kindly sign in as a user"})
        }

        // const token = authorization.slice(7, authorization.length)

        // let verified = jwt.verify(token,  jwtsecret)
        let verified = jwt.verify(authorization,  jwtsecret)

        if(!verified){
            return res.status(401).json({Error: "token invalid, you can't access this route"})
        }

        const {doctorsId} = verified as {[key: string]: string}

        // find user by id - 
        const user = await Doctor.findById({_id:doctorsId})

        if(!user){
        res.status(401).json({error: "Kindly signin as a user"})
        }
        req.user = verified
        next()

    }catch(err){
        res.status(401).json({error: "Your are not logged in"})
    }
}