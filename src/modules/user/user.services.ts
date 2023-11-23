import { IUser } from "./user.interface";
import { User } from "./user.model";

const createuser = (data : IUser) =>{
    const result = User.create(data);
    return result;
}


export const userService = {
    createuser
}