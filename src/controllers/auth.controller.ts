import { Request, Response } from "express";
import { findUserByEmail } from "../service/user.service";
import { CreateSessionInput } from "../schema/auth.schema";
import { signAccessToken, signRefreshToken } from "../service/auth.service";


export async function createSessionHandler(
    req : Request<{}, {}, CreateSessionInput>,
    res : Response
){
    const {email, password} = req.body
    const message = "Invalid email or password"

    const user = await findUserByEmail({ email })
    if(!user){
        return res.send(message)
    }

    if(!user.verified){
        return res.send("Verify your email")
    }

    const isValid = await user.validatePassword(password)

    if(!isValid){
        return res.send(message)
    }

    //sign a access token
    const accessToken = signAccessToken(user)

    //sign a refresh token
    const refreshToken = signRefreshToken({userId : user._id})

    //send tokens
    return res.send({accessToken, refreshToken})
}   

