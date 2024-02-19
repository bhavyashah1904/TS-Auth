import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User } from "./user.model";

//This session is going to reference the users
//
export class Session{
    @prop({ref : () => User})// reference for mongoose
    user : Ref<User>

    //set to false when a user logs out and we wont be able to create refresh token for that session anymore
    @prop({default : true})
    valid : boolean;
}


const SessionModel = getModelForClass (Session, {
    schemaOptions  : {
        timestamps : true
    }
});

export default SessionModel;