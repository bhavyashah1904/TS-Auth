import jwt from "jsonwebtoken";
import config from 'config'

export function signJWT(
    object : Object,
    keyName : "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options ?: jwt.SignOptions | undefined
){
    //to decode the base64encoded keys use Buffer.from
    const signingKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii')
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm : "RS256"
    })
}

export function verifyJwt<T>(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
  ): T | null {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
      "ascii"
    );
  
    try {
      const decoded = jwt.verify(token, publicKey) as T;
      return decoded;
    } catch (e) {
      return null;
    }
  }