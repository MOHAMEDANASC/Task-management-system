import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/authValidator";


export const registerUser =async (req: Request, res: Response) => {
    try {

      const parsed = registerSchema.parse( req.body);

        const {email, password} = parsed;

        const existingUser  = await prisma.user.findUnique({
            where: {email},
        });

        if(existingUser) {
            return res.status(400).json({
                message : "User alredy exisit"
            });
        }

        const hashedpassword = await bcrypt.hash(password,15);

        const user = await prisma.user.create({
            data : {
                email,
                password : hashedpassword,
            },
        });

        res.json(user);

    } catch(error) {
        res.status(500).json({
            Message : "Register error",
            error,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const parsed = loginSchema.parse(req.body);

    const { email, password } = parsed;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // ✅ include role in token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // ✅ send user also
    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error: any) {
  console.log("LOGIN ERROR:", error);

  return res.status(400).json({
    message: error?.message || "Login failed",
    error,
  });
 }
};
