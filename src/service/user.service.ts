import UserModel, {User} from "../model/user.model";

//  The Partial<User> type indicates that not all properties of the User interface are required for this function; some may be optional.
export function createUser(input : Partial<User>) {
    return UserModel.create(input)
}

export function findUserById(id : string) {
    return UserModel.findById(id)
}

export function findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }