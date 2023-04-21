import { Request, Response, NextFunction } from "express";
import Doctor from "../models/doctorsModel";
import { signupSchema, options, loginSchema } from "../utils/utils";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import Report from "../models/reportModel";

const jwtsecret = process.env.JWT_SECRET as string;

// /* ======================================= User API ========================= */

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { doctorsName, email, specialization, gender, phoneNumber, password } = req.body;

        const validationResult = signupSchema.validate(req.body, options);
        if(validationResult.error){
            return res.status(400).json({Error: validationResult.error.details[0].message})
        }

        const passwordHash = await bcrypt.hash(password, 8)

        interface IKey {
        [key: string]: string
        }
        
        const existingUser = await Doctor.findOne({email}) as unknown as IKey
        
        if(existingUser){
            return next(new Error('Email already exists'))
        }
        const newUser = Doctor.build({
            doctorsName,
            email,
            specialization,
            gender,
            phoneNumber,
            password:passwordHash
        })

        await newUser.save();

        const user = await Doctor.findOne({email}) as unknown as IKey

        const {id} = user

        const token = jwt.sign({id}, jwtsecret,{expiresIn: "30mins"})
        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 30*60*1000
        })

        res.status(200).json({
            msg: "user created sucessfully",
            newUser,
            token
        })
       
    }catch(err){
        console.log(err);
        res.status(500).json({Error: "Internal server error"})
    }
  }

  export const Login = async(req: Request, res: Response) => {
    try{
        const { email, password } = req.body

        const validationResult = loginSchema.validate(req.body, options);

        if(validationResult.error){
            return res.status(400).json({Error: validationResult.error.details[0].message})
        }
        
        const doctor = await Doctor.findOne({email}) as unknown as { [key: string]: string}

        const token = jwt.sign({doctorsId:doctor._id}, jwtsecret,{expiresIn: "30days"});
        res.cookie('token', token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});

        const validUser = await bcrypt.compare(password, doctor.password)

        if(validUser){
            return res.status(201).json({
                msg: "you have sucessfully logged in",
                doctor,
                token
            })
        }
        return res.status(400).json({Error: 'invalid email/password'})

    }catch(err){
        console.log(err);
        res.status(500).json({Error: "Internal server error"})
    }
  }

  export const Logout =async (req: Request, res: Response) => {
    res.clearCookie("token")
    res.redirect("/login")
  }

