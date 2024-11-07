import { Schema,model, type Document } from "mongoose";

interface IUser extends Document {
    userName : string,
    email : string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
}

const userSchema = new Schema<IUser>(
    {
        userName : {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
            match :  /.+\@.+\..+/ //email validation 
        },
        thoughts : [
            {
                type :Schema.Types.ObjectId,
                ref: 'Thought', // ref thought
            }
        ],
        friends : [
            {
                type :Schema.Types.ObjectId,
                ref: 'User', // self ref
            }
        ],
        
    },
    {
        toJSON: {
            virtuals : true,
        },
        timestamps : true,
    },
);

// getting the friend count 
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model<IUser>('User',userSchema);

export default User;