import SessionModel from "../model/session.model"
import { User } from "../model/user.model"
import { signJWT } from "../utils/jwt"
import { DocumentType } from "@typegoose/typegoose"

export async function createSession({userId} : {userId : string}){
    return SessionModel.create({user : userId})
}

export async function signRefreshToken({userId} : {userId : string}){
    const session = await createSession({
        userId
    })
    const refreshToken = signJWT({sessionId : session._id}, "refreshTokenPrivateKey")
    return refreshToken;
}

export function signAccessToken(user : DocumentType<User>){
    const payload = user.toJSON()
    const accessToken = signJWT(payload, "accessTokenPrivateKey")
    return accessToken;
}

