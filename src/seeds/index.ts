import { User,Thought } from "../models/index.js";

const cleanDB = async (): Promise<void> => {
    try{
        await User.deleteMany({});
        console.log('User collection cleaned');

        await Thought.deleteMany({});
        console.log('Thought collection cleaned');

    }catch(e){
        console.error('Eror cleaning collections: ',e);
        process.exit(1);
    }
};

export default cleanDB;