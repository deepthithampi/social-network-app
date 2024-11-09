import { Schema,model, type Document , Types} from "mongoose";

// the Reaction interface for the nested subdocument
interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}
// the thought interface
interface IThought extends Document{

    thoughText : string,
    createdAt : Date,
    username : string,
    reactions : IReaction[];
}

//the reaction schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type : Schema.Types.ObjectId,
            default : () => new Types.ObjectId(),
        },
        reactionBody: {
            type : String,
            required : true,
            maxlength :280,
        },
        username: {
            type : String,
            required : true,
        },
        createdAt: {
            type: Date,
            default : Date.now,
            get: (timestamp: Date)=> (timestamp?timestamp.toLocaleString():''),
        } as any,
    },
    {
        _id : false,
        toJSON : {getters: true}
    }
);

// the thought schema
const thoughtSchema = new Schema<IThought>(
    {
      thoughText : {
        type : String,
        required : true,
        maxlength : 280,
        minlength : 1,

      },
      createdAt : {
        type : Date,
        default : Date.now,
        get : (timestamp : Date) =>(timestamp? timestamp.toLocaleString(): ''),

      } as any,
      username : {
        type : String,
        required : true,
      },
      reactions : [reactionSchema], //rectionschema as an array 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false, // disabling the vitual di
        timestamps: true,
    }

);

//virtual proprty
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

//creating and exporting thoughrt model
const Thought = model<IThought>('Thought',thoughtSchema);

export default Thought;