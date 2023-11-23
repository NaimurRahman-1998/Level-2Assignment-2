import { IUser } from "./user.interface";
import { User } from "./user.model";

const createuser = (data : IUser) =>{
    const result = User.create(data);
    return result;
}
const getAllUser = () =>{
    const result = User.find();
    return result;
}
const getSingleUser = (id : string) =>{
    const result = User.findOne( {userId : id} );
    return result;
}
const updateUser = (id : string , data : IUser) =>{
    const result = User.findOneAndUpdate( {userId : id} , data ,{ new: true ,runValidators: true})
    return result;
}
const deleteUser = (id : string) =>{
    const result = User.findOneAndDelete({userId : id});
    return result;
}


export const userService = {
    createuser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}