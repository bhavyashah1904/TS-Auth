import { omit } from "lodash"
import SessionModel from "../model/session.model"
import { User, privateFields } from "../model/user.model"
import { signJWT } from "../utils/jwt"
import { DocumentType } from "@typegoose/typegoose"

export async function createSession({userId} : {userId : string}){
    return SessionModel.create({user : userId})
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJWT(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export function signAccessToken(user : DocumentType<User>){
    const payload = omit(user.toJSON(), privateFields);
    const accessToken = signJWT(payload, "accessTokenPrivateKey", {
        expiresIn: "15m",
      });
    return accessToken;
}

