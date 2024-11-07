import { Schema,model, type Document } from "mongoose";

interface IUser extends Document {
    userName : string,
    email : string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}

const userChema = 