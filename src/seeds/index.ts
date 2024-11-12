import db from '../config/connection.js';
import {User, Thought} from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandonUsername,getRandomEmail,getRandomThought,getRandomReactions, getRandomArrItem } from './data.js';

const seedDatabase = async () =>{
 try{
    // db connectivity  
    await db();

    // clean db
    await cleanDB();

    // arrays foe users and thoughts
    const users = [];
    const thoughts = [];
    // generate 5 users with random username asn emails
    for (let i=0;i<5;i++){
        const username = getRandonUsername();
        const email = getRandomEmail(username);

        users.push({username,email});
    }
    //insert usrs into the db
    const userData = await User.create(users);

    //generate 10 thiughts , each linked to a random user
    for (let i = 0;i<10;i++){
        const thoughText = getRandomThought();
        const username = getRandomArrItem(userData).username; //associating thought with a random username
        const reactions = getRandomReactions(2); //each thought has 2 randim reactins
         
        thoughts.push({  // pushed to the tthoughts arrat
            thoughText,
            username,
            reactions,
        });
    }
    //insert thoughts into the db
    const thoughtData = await Thought.create(thoughts);

    //update users to include thought references
    for( const thought of thoughtData){
        await User.findOneAndUpdate(
            {username : thought.username},
            {$push: {thoughts: thought._id}}
        )
    }
    console.table(userData);
    console.table(thoughtData);
    console.info('Seeding complete! 🌱');
    process.exit(0);


 }catch(e){
    console.error('Error seeding database : ',e)
    process.exit(1);
 }
};

seedDatabase();