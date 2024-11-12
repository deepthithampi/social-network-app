import db from '../config/connection.js';
import {User, Thought} from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandonUsername,getRandomEmail,getRandomThought,getRandomReactions, getRandomArrItem } from './data.js'; //,getRandomThought,getRandomReactions, getRandomArrItem

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
    console.log('Users created:', userData);

    console.log('Creating thoughts with these users:', userData.map(user => user.username));
    //generate 10 thiughts , each linked to a random user
    for (let i = 0;i<10;i++){
        console.log("In thought for loop");
        const thoughtText = getRandomThought();
        console.log("THOUGHT TEXT ==> ",thoughtText);
        const username = getRandomArrItem(userData).username; //associating thought with a random username
        console.log("USERNAME ASSOCIATED  ==> ",username);
        const reactions = getRandomReactions(3); //each thought has 2 randim reactins
        console.log("REACTIONS ASSOCIATED ==> ",reactions);
        thoughts.push({  // pushed to the tthoughts arrat
            thoughtText,
            username,
            reactions,
        });
        console.log(`Thought ${i + 1}:`, { thoughtText, username, reactions });
    //     console.log('Creating thoughts...');
    //   thoughts.forEach(thought => console.log(thought));
    }
    // const testThought = {
    //     thoughtText: "Test thought for debugging",
    //     username: "sandy123",
    //     reactions: [
    //         {
    //             reactionBody: "This is interesting!",
    //             username: "deepthi123",
    //             createdAt: new Date()
    //         },
    //         {
    //             reactionBody: "I agree!",
    //             username: "family123",
    //             createdAt: new Date()
    //         }
    //     ]
    // };
    
    // console.log('Thoughts array before insertion:', thoughts);
    //insert thoughts into the db
    console.log('Creating thoughts...');
    const thoughtData = await Thought.create(thoughts);
    console.log('Thoughts created:', thoughtData);
    // await User.findOneAndUpdate(
    //     { username: thoughtData.username },
    //     { $push: { thoughts: thoughtData._id } }
    // );
    
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
//  }catch(e){
//          console.error('Error creating thoughts:',e)
//     }

 }catch(e){
    console.error('Error seeding database : ',e)
    process.exit(1);
 }
};

seedDatabase();