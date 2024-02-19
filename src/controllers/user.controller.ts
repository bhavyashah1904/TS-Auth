import {Request, Response} from 'express'
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from '../schema/user.schema'
import sendEmail from '../utils/mailer'
import { createUser, findUserByEmail, findUserById } from '../service/user.service';
import log from '../utils/logger';
import { v4 as uuidv4 } from 'uuid'

//The Request interface is also a generic and we dont want the first argumnet which is the params
//we also dont want the second argument which is the ResBody
//But we want the third argument which is the ReqBody which is going to be our createUserInput 
export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
  ) {
    const body = req.body;
  
    try {
      const user = await createUser(body);
  
      await sendEmail({
        to: user.email,
        from: "test@example.com",
        subject: "Verify your email",
        text: `verification code: ${user.verificationCode}. Id: ${user._id}`,
      });
    
    return res.send(`User : ${user.email} successfully created`);

    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).send("Account already exists");

      }
  
      return res.status(500).send(e);
    }
  }

  export async function verifyUserHandler (req : Request<VerifyUserInput>, res: Response){
      const id = req.params.id; 
      const verificationCode = req.params.verificationCode;
    
      //find the user by id
      const user = await findUserById(id);

      if(!user){
        return res.send("User not found") 
      }
      //check to see if they are already verified
      if(user.verified){
        return res.send("User already verified")
      }

      //check to see if the verification code is correct
      if(user.verificationCode === verificationCode){
        user.verified = true;
        await user.save();
        return res.send("User verified successfully")
      }

      return res.send("Invalid verification code")
    
    }

    export async function forgotPasswordHandler(
      req: Request<{}, {}, ForgotPasswordInput>,
      res: Response
    ) {
      const message =
        "If a user with that email is registered you will receive a password reset email";
    
      const { email } = req.body;
    
      const user = await findUserByEmail(email);
    
      if (!user) {
        log.debug(`User with email ${email} does not exists`);
        return res.send(message);
      }
    
      if (!user.verified) {
        return res.send("User is not verified");
      }
    
      const passwordResetCode = uuidv4();
    
      user.passwordResetCode = passwordResetCode;
    
      await user.save();
    
      await sendEmail({
        to: user.email,
        from: "test@example.com",
        subject: "Reset your password",
        text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
      });
    
      log.debug(`Password reset email sent to ${email}`);
    
      return res.send(message);
    }

    export async function resetPasswordHandler(
      req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
      res: Response
    ) {
      const { id, passwordResetCode } = req.params;
    
      const { password } = req.body;
    
      const user = await findUserById(id);
    
      if (
        !user ||
        !user.passwordResetCode ||
        user.passwordResetCode !== passwordResetCode
      ) {
        return res.status(400).send("Could not reset user password");
      }
    
      user.passwordResetCode = null;
    
      //No need to hash the password here we have a pre save hook in user.model to hanlde that
      user.password = password;
    
      await user.save();
    
      return res.send("Successfully updated password");
    }